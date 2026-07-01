import React from 'react';
import { MovementReason } from '../../types';

interface MovementReasonSelectorProps {
  value: MovementReason;
  onChange: (reason: MovementReason) => void;
}

const REASONS: { value: MovementReason; label: string; group: string }[] = [
  { value: 'opening_stock', label: 'Opening Stock', group: 'In' },
  { value: 'purchase', label: 'Purchase', group: 'In' },
  { value: 'return', label: 'Return', group: 'In' },
  { value: 'transfer_in', label: 'Transfer In', group: 'In' },
  { value: 'sale', label: 'Sale', group: 'Out' },
  { value: 'damage', label: 'Damage', group: 'Out' },
  { value: 'expiry', label: 'Expiry', group: 'Out' },
  { value: 'transfer_out', label: 'Transfer Out', group: 'Out' },
  { value: 'correction', label: 'Correction', group: 'Adjustment' },
  { value: 'other', label: 'Other', group: 'Adjustment' },
];

export const MovementReasonSelector: React.FC<MovementReasonSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Reason
      </label>
      <select
        id="reason"
        name="reason"
        value={value}
        onChange={(e) => onChange(e.target.value as MovementReason)}
        className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6"
      >
        <optgroup label="Stock In">
          {REASONS.filter((r) => r.group === 'In').map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Stock Out">
          {REASONS.filter((r) => r.group === 'Out').map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Adjustment">
          {REASONS.filter((r) => r.group === 'Adjustment').map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
