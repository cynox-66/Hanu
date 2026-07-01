import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from '../hooks';
import { OrderItem, CreateOrderDTO } from '../types';
import { useCustomers } from '../../customer/hooks';
import { useProducts } from '../../product/hooks';
import { Product } from '../../product/types';
import { CustomerSelector } from './CustomerSelector';
import { ProductSelector } from './ProductSelector';
import { OrderItemRow } from './OrderItemRow';

export const OrderBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { customers } = useCustomers();
  const { products } = useProducts();
  const { createOrder, isSaving } = useCreateOrder();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');

  const activeProducts = useMemo(() => products.filter((p) => p.status === 'active'), [products]);
  const activeCustomers = useMemo(
    () => customers.filter((c) => c.status === 'active'),
    [customers],
  );

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

  const handleSelectCustomer = (id: string, name: string) => {
    setSelectedCustomerId(id);
    setSelectedCustomerName(name);
  };

  const handleAddProduct = (product: Product) => {
    setItems((currentItems) => {
      const existing = currentItems.find((i) => i.productId === product.id);
      if (existing) {
        return currentItems.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...currentItems,
        {
          productId: product.id,
          productName: product.name,
          unitPrice: product.sellingPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleIncrease = (productId: string) => {
    setItems((currentItems) =>
      currentItems.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const handleDecrease = (productId: string) => {
    setItems((currentItems) =>
      currentItems.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i,
      ),
    );
  };

  const handleRemove = (productId: string) => {
    setItems((currentItems) => currentItems.filter((i) => i.productId !== productId));
  };

  const handleCreateOrder = async () => {
    if (!selectedCustomerId || items.length === 0) return;

    const dto: CreateOrderDTO = {
      customerId: selectedCustomerId,
      customerName: selectedCustomerName,
      items,
      status: 'pending',
      notes: notes || undefined,
    };

    const success = await createOrder(dto);
    if (success) {
      navigate('/orders');
    }
  };

  const isValid = selectedCustomerId && items.length > 0;

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Customer Selection */}
      <section className="bg-white p-4 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Customer</h2>
        <CustomerSelector
          customers={activeCustomers}
          selectedCustomer={selectedCustomerId}
          onSelect={handleSelectCustomer}
        />
      </section>

      {/* Product Selection */}
      <section className="bg-white p-4 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add Products</h2>
        <ProductSelector products={activeProducts} onAdd={handleAddProduct} />
      </section>

      {/* Order Items */}
      <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Order Items</h2>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No products added yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.productId}>
                <OrderItemRow
                  item={item}
                  onIncrease={() => handleIncrease(item.productId)}
                  onDecrease={() => handleDecrease(item.productId)}
                  onRemove={() => handleRemove(item.productId)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notes */}
      <section className="bg-white p-4 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Notes (Optional)</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add order notes..."
          className="w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          rows={3}
        />
      </section>

      {/* Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleCreateOrder}
          disabled={!isValid || isSaving}
          className="w-full rounded-xl bg-gray-900 px-4 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 transition-opacity"
        >
          {isSaving ? 'Creating Order...' : 'Create Order'}
        </button>
      </div>
    </div>
  );
};
