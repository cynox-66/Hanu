import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrder, useEditOrder } from '../hooks';
import { OrderStatus, UpdateOrderDTO } from '../types';

export const EditOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error } = useOrder(id);
  const { editOrder, isSaving } = useEditOrder();

  const [status, setStatus] = useState<OrderStatus>('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setNotes(order.notes || '');
    }
  }, [order]);

  const handleSave = async () => {
    if (!order) return;
    const updates: UpdateOrderDTO = {
      status,
      notes: notes || undefined,
    };

    const success = await editOrder(order, updates);
    if (success) {
      navigate('/orders');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="text-lg font-bold text-gray-900">Order not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          The order you&apos;re looking for doesn&apos;t exist or could not be loaded.
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 pb-3 pt-safe-top shadow-sm">
        <div className="flex items-center gap-3 pt-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
            aria-label="Go back"
          >
            <svg
              className="h-6 w-6 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            <p className="text-xs text-gray-500">#{order.id.slice(0, 8)}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-6" id="edit-order-main">
        {/* Read-Only Info */}
        <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">
            Customer Info
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Customer</span>
            <span className="font-medium text-gray-900">{order.customerName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date</span>
            <span className="font-medium text-gray-900">{date}</span>
          </div>
        </section>

        <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">
            Order Items
          </h2>
          <ul className="flex flex-col gap-3">
            {order.items.map((item, idx) => (
              <li
                key={`${item.productId}-${idx}`}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{item.productName}</span>
                  <span className="text-xs text-gray-500">
                    {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  ₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-gray-900 text-lg">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </section>

        {/* Editable Controls */}
        <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">
            Update Status
          </h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-base shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add or update order notes..."
              className="w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              rows={4}
            />
          </div>
        </section>
      </main>

      {/* Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 pb-safe-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full rounded-xl bg-gray-900 px-4 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 transition-opacity"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
