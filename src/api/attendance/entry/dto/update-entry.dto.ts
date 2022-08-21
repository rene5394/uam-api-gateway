import { IsDateString, IsInt, IsOptional, Length, Max, Min } from "@nestjs/class-validator";
export class UpdateEntryDto {
  @IsOptional()
  @Length(100)
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
