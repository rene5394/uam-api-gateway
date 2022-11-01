import { IsDateString, IsInt, IsOptional, Length, Max, Min } from "@nestjs/class-validator";
export class CreateEntriesDto {
  @IsInt()
  @Min(1)
  employee_id: number;

  @IsInt()
  @Min(1)
  team_id: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @Length(100)
  comment: string;

  @IsInt()
  @Min(1)
  user_id: number;

  @IsInt()
  @Min(1)
  attendance_status: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  days: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  update_by: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  paid: number;
}
