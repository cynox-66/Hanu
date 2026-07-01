import { OrderRepository } from '../domain/OrderRepository';
import { InventoryRepository } from '../../inventory/domain/InventoryRepository';
import { createOrderFromDTO } from '../domain/OrderFactory';
import { createStockMovementFromDTO } from '../../inventory/domain/InventoryFactory';
import { validateSaleQuantity } from '../../inventory/domain/InventoryFactory';
import { CreateOrderDTO } from '../types';

export class CreateOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(dto: CreateOrderDTO): Promise<void> {
    // 1. Validate stock availability for every item BEFORE persisting anything.
    //    Fail fast: check all items first, throw on the first violation.
    for (const item of dto.items) {
      const summary = await this.inventoryRepository.findSummaryByProductId(item.productId);
      const available = summary?.availableStock ?? 0;
      // Domain invariant: throws a human-readable Error on oversell or invalid qty
      validateSaleQuantity(item.quantity, available, item.productName);
    }

    // 2. Persist the order.
    const order = createOrderFromDTO(dto);
    await this.orderRepository.save(order);

    // 3. Deduct stock by recording one StockMovement per line item.
    //    These are recorded sequentially — each updates the summary atomically in DexieInventoryRepository.
    for (const item of dto.items) {
      const movement = createStockMovementFromDTO({
        productId: item.productId,
        productName: item.productName,
        reason: 'sale',
        quantity: item.quantity,
        costPerUnit: null,
        referenceId: order.id,
        referenceType: 'order',
        notes: null,
      });
      await this.inventoryRepository.recordMovement(movement);
    }
  }
}
