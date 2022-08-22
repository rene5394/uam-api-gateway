import { IsDateString, IsInt, IsOptional, MaxLength, Max, MinLength, Min } from "@nestjs/class-validator";
export class UpdateEntryDto {
  @IsOptional()
  @MaxLength(100)
  comment: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  attendance_status: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  days: number;

  @IsInt()
  @Min(1)
  update_by: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  paid: number;
}
