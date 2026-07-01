import React from 'react';
import { StockMovement } from '../../types';
import { formatCurrency } from '../../../../shared/utils/currency';

interface MovementRowProps {
  movement: StockMovement;
}

export const MovementRow: React.FC<MovementRowProps> = ({ movement }) => {
  const isPositive =
    movement.type === 'stock_in' || (movement.type === 'adjustment' && movement.quantity > 0);
  const isNegative =
    movement.type === 'stock_out' || (movement.type === 'adjustment' && movement.quantity < 0);

  const sign = isPositive ? '+' : isNegative ? '-' : '';
  const quantityColor = isPositive
    ? 'text-green-600'
    : isNegative
      ? 'text-red-600'
      : 'text-gray-900';

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900 capitalize">
          {(movement.reason as string).replaceAll('_', ' ')}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(movement.createdAt).toLocaleDateString()}{' '}
          {new Date(movement.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        {movement.referenceId && (
          <p className="text-xs text-gray-400 mt-1">
            Ref: {movement.referenceType} ({movement.referenceId.slice(0, 8)})
          </p>
        )}
      </div>
      <div className="text-right">
        <p className={`text-base font-bold ${quantityColor}`}>
          {sign}
          {Math.abs(movement.quantity)}
        </p>
        {movement.costPerUnit != null && (
          <p className="text-xs text-gray-500">@ {formatCurrency(movement.costPerUnit)}</p>
        )}
      </div>
    </div>
  );
};
