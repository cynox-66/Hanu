import React, { createContext, useContext, useMemo } from 'react';
import { OrderRepository } from '../domain/OrderRepository';
import { InventoryRepository } from '../../inventory/domain/InventoryRepository';
import { GetOrders } from '../application/GetOrders';
import { GetOrderById } from '../application/GetOrderById';
import { CreateOrder } from '../application/CreateOrder';
import { EditOrder } from '../application/EditOrder';
import { ArchiveOrder } from '../application/ArchiveOrder';

interface OrderUseCases {
  getOrders: GetOrders;
  getOrderById: GetOrderById;
  createOrder: CreateOrder;
  editOrder: EditOrder;
  archiveOrder: ArchiveOrder;
}

const OrderContext = createContext<OrderUseCases | null>(null);

interface OrderProviderProps {
  repository: OrderRepository;
  inventoryRepository: InventoryRepository;
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({
  repository,
  inventoryRepository,
  children,
}) => {
  const useCases = useMemo(() => {
    return {
      getOrders: new GetOrders(repository),
      getOrderById: new GetOrderById(repository),
      createOrder: new CreateOrder(repository, inventoryRepository),
      editOrder: new EditOrder(repository),
      archiveOrder: new ArchiveOrder(repository),
    };
  }, [repository, inventoryRepository]);

  return <OrderContext.Provider value={useCases}>{children}</OrderContext.Provider>;
};

export const useOrderUseCases = (): OrderUseCases => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderUseCases must be used within an OrderProvider');
  }
  return context;
};
