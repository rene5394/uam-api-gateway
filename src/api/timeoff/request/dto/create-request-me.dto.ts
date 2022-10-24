import { IsDateString, IsInt, IsOptional, Max, MaxLength, Min } from "@nestjs/class-validator";

export class CreateRequestMeDto {
    @IsInt()
    @Min(1)
    @IsOptional()
    userId: number;

    @MaxLength(300)
    @IsOptional()
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