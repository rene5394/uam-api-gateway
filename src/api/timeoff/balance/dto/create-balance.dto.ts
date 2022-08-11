import { IsInt, IsOptional, Min } from "class-validator";

export class CreateBalanceDto {
  @IsInt()
  @Min(1)
  user_id: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  comp_days: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  vacation_days: number;
}
