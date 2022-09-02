import { IsDateString, IsInt, IsOptional, Max, Min } from "@nestjs/class-validator";

export class CreateRequestMeDto {
    @IsInt()
    @Min(1)
    @IsOptional()
    userId: number;

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
}