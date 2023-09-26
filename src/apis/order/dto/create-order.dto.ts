import { IsOptional, IsEnum } from 'class-validator';

enum Status {
  ACCEPTED = 'accepted',
  PREPARED = 'prepared',
  DISPATCHED = 'dispatched',
  COMPLETED = 'completed',
}

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(Status, {
    message:
      'Invalid status. Status should be one of: accepted, prepared, dispatched, completed',
  })
  status?: string;
}
