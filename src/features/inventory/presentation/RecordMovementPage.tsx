import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecordMovement } from '../hooks';
import { useActiveProducts } from '../../product/hooks';
import { MovementReason, ReferenceType } from '../types';
import { isAdjustmentReason } from '../domain/InventoryFactory';
import { MovementReasonSelector } from './components/MovementReasonSelector';

export const RecordMovementPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedProductId = searchParams.get('productId');

  const { products: activeProducts, isLoading: productsLoading } = useActiveProducts();
  const { recordMovement, isSaving, error } = useRecordMovement();

  const [productId, setProductId] = useState<string>(preselectedProductId || '');
  const [reason, setReason] = useState<MovementReason>('opening_stock');
  const [quantity, setQuantity] = useState<string>('');
  const [costPerUnit, setCostPerUnit] = useState<string>('');
  const [referenceId, setReferenceId] = useState<string>('');
  const [referenceType, setReferenceType] = useState<ReferenceType>('manual');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (preselectedProductId && !productId) {
      setProductId(preselectedProductId);
    }
  }, [preselectedProductId, productId]);

  const selectedProduct = activeProducts.find((p) => p.id === productId);

  const isValid = productId && quantity && !isNaN(Number(quantity));

  // Is it an adjustment? Adjustments can be negative. Others must be positive.
  const isAdjustment = isAdjustmentReason(reason);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !selectedProduct) return;

    const parsedQuantity = Number(quantity);
    if (!isAdjustment && parsedQuantity <= 0) {
      alert('Quantity must be greater than 0 for this reason.');
      return;
    }

    const success = await recordMovement({
      productId: selectedProduct.id,
      productName: selectedProduct.name, // Snapshot
      reason,
      quantity: parsedQuantity,
      costPerUnit: costPerUnit ? Number(costPerUnit) : null,
      referenceId: referenceId || null,
      referenceType: referenceId ? referenceType : 'manual',
      notes: notes || null,
    });

    if (success) {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-safe">
      <div className="sticky top-0 z-10 bg-white/80 px-4 py-3 backdrop-blur-xl border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Record Stock</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 flex flex-col gap-6">
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-800">{error.message}</p>
          </div>
        )}

        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Product
            </label>
            <select
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              disabled={productsLoading || !!preselectedProductId}
              className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Select a product...</option>
              {activeProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <MovementReasonSelector value={reason} onChange={setReason} />

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Quantity {isAdjustment ? '(can be negative)' : ''}
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
              placeholder="e.g. 10"
              step="any"
            />
          </div>

          <div>
            <label
              htmlFor="costPerUnit"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Cost Per Unit (Optional)
            </label>
            <input
              type="number"
              id="costPerUnit"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
              placeholder="e.g. 150.00"
              min="0"
              step="0.01"
            />
          </div>
        </section>

        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h2 className="text-base font-semibold text-gray-900">Reference Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="referenceType"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Type
              </label>
              <select
                id="referenceType"
                value={referenceType}
                onChange={(e) => setReferenceType(e.target.value as ReferenceType)}
                className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
              >
                <option value="manual">Manual</option>
                <option value="order">Order</option>
                <option value="purchase">Purchase</option>
                <option value="transfer">Transfer</option>
                <option value="return">Return</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="referenceId"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Reference ID
              </label>
              <input
                type="text"
                id="referenceId"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
              placeholder="Additional details..."
              rows={3}
            />
          </div>
        </section>

        <div className="pb-8">
          <button
            type="submit"
            disabled={!isValid || isSaving}
            className="w-full rounded-xl bg-gray-900 px-4 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 transition-opacity"
          >
            {isSaving ? 'Saving...' : 'Record Movement'}
          </button>
        </div>
      </form>
    </div>
  );
};
