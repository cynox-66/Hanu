import { InventoryRepository } from '../domain/InventoryRepository';
import { CreateStockMovementDTO } from '../types';
import {
  createStockMovementFromDTO,
  isAdjustmentReason,
  validateStockMovementQuantity,
} from '../domain/InventoryFactory';

export class RecordStockMovement {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(dto: CreateStockMovementDTO): Promise<void> {
    // Validate quantity at the Application boundary.
    // Adjustments (corrections) may be negative and are not subject to the max-100 rule.
    if (!isAdjustmentReason(dto.reason)) {
      validateStockMovementQuantity(dto.quantity);
    }

    const movement = createStockMovementFromDTO(dto);
    await this.repository.recordMovement(movement);
  }
}
