import React, { createContext, useContext, useMemo } from 'react';
import { InventoryRepository } from '../domain/InventoryRepository';
import { RecordStockMovement } from '../application/RecordStockMovement';
import { GetMovementsByProduct } from '../application/GetMovementsByProduct';
import { GetInventorySummary } from '../application/GetInventorySummary';
import { GetInventorySummaries } from '../application/GetInventorySummaries';
import { RebuildSummary } from '../application/RebuildSummary';

interface InventoryUseCases {
  recordMovement: RecordStockMovement;
  getMovementsByProduct: GetMovementsByProduct;
  getInventorySummary: GetInventorySummary;
  getInventorySummaries: GetInventorySummaries;
  rebuildSummary: RebuildSummary;
}

const InventoryContext = createContext<InventoryUseCases | null>(null);

interface InventoryProviderProps {
  repository: InventoryRepository;
  children: React.ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ repository, children }) => {
  const useCases = useMemo(() => {
    return {
      recordMovement: new RecordStockMovement(repository),
      getMovementsByProduct: new GetMovementsByProduct(repository),
      getInventorySummary: new GetInventorySummary(repository),
      getInventorySummaries: new GetInventorySummaries(repository),
      rebuildSummary: new RebuildSummary(repository),
    };
  }, [repository]);

  return <InventoryContext.Provider value={useCases}>{children}</InventoryContext.Provider>;
};

export const useInventoryUseCases = (): InventoryUseCases => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryUseCases must be used within an InventoryProvider');
  }
  return context;
};
