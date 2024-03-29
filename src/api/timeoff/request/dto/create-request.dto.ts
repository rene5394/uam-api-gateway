import { IsDateString, IsInt, IsOptional, Max, MaxLength, Min } from "@nestjs/class-validator";

export class CreateRequestDto {
    @IsInt()
    @Min(1)
    userId: number;

    @MaxLength(300)
    comment: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    createdBy: number;

    @IsInt()
    @Min(1)
    @Max(5)
    typeId: number;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsOptional()
    roleId: number;

    @IsInt()
    @Min(0)
    @Max(1)
    @IsOptional()
    coachApproval: number;
}