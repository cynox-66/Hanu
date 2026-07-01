import React from 'react';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onArchive?: (id: string) => void;
}

const STATUS_CONFIG: Record<Order['status'], { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500' },
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, onArchive }) => {
  const status = STATUS_CONFIG[order.status];
  const itemsCount = order.items.length;
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm active:scale-[0.98] transition-transform duration-150 relative group"
      role="article"
      aria-label={`Order by ${order.customerName}`}
    >
      {/* Icon / Date placeholder */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-500">
        <svg
          className="h-6 w-6 mb-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-[10px] font-medium leading-none">
          {date.split(' ')[0]} {date.split(' ')[1]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="truncate text-base font-semibold text-gray-900">{order.customerName}</p>
        <p className="truncate text-sm text-gray-500">
          {itemsCount} item{itemsCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Price + Status + Action */}
      <div className="flex shrink-0 flex-col items-end gap-1 relative z-10">
        {onArchive ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onArchive(order.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={`Archive order ${order.id}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </button>
        ) : (
          <p className="text-base font-bold text-gray-900">
            ₹{order.totalAmount.toLocaleString('en-IN')}
          </p>
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}
          aria-label={`Status: ${status.label}`}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
};
