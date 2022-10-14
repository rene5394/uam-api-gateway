import { IsInt, Min } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class CreateTransactionDto {
    @IsInt()
    @Min(1)
    requestId: number;
    
    @IsInt()
    @Min(1)
    transactionStatusId: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    createdBy: number;
}