import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateBalanceDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  compDays: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  vacationDays: number;
}
