import React from 'react';
import { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
  onArchive?: (id: string) => void;
}

const STATUS_CONFIG: Record<Customer['status'], { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500' },
};

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onArchive }) => {
  const status = STATUS_CONFIG[customer.status];

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm active:scale-[0.98] transition-transform duration-150 relative group"
      role="article"
      aria-label={`Customer: ${customer.name}`}
    >
      {/* Placeholder Avatar */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
        {customer.name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="truncate text-base font-semibold text-gray-900">{customer.name}</p>
        <p className="truncate text-sm text-gray-500">{customer.phone}</p>
      </div>

      {/* Action + Status */}
      <div className="flex shrink-0 flex-col items-end gap-1 relative z-10">
        {onArchive && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onArchive(customer.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={`Archive ${customer.name}`}
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
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className} ${!onArchive ? 'mt-[1.375rem]' : ''}`}
          aria-label={`Status: ${status.label}`}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
};
