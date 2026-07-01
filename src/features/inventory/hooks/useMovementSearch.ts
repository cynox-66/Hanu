import { useState, useMemo } from 'react';
import { StockMovement, StockMovementFilterDTO } from '../types';
import { SearchMovements } from '../application/SearchMovements';

export function useMovementSearch(movements: StockMovement[]) {
  const [filters, setFilters] = useState<StockMovementFilterDTO>({});

  const filteredMovements = useMemo(() => {
    const searchUseCase = new SearchMovements();
    return searchUseCase.execute(movements, filters);
  }, [movements, filters]);

  return { filters, setFilters, filteredMovements };
}
