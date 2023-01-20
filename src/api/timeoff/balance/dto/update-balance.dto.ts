import { MaxLength } from '@nestjs/class-validator';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateBalanceDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  compDays: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  vacationDays: number;

  @MaxLength(300)
  comment: string;
}
