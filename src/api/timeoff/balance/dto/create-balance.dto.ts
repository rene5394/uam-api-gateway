import { IsInt, IsOptional, Min } from "class-validator";

export class CreateBalanceDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  compDays: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  vacationDays: number;
}
