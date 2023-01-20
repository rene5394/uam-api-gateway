import { IsInt, IsOptional, Max, MaxLength, Min } from '@nestjs/class-validator';
import { BalanceOperation } from '../../../../common/enums/balanceOperation.enum';

export class CreateBalanceTransactionDto {
    @IsInt()
    @Min(1)
    balanceId: number;

    @IsInt()
    @Min(1)
    typeId: number;

    @IsInt()
    @Min(0)
    @Max(1)
    operation: BalanceOperation;

    @IsInt()
    @Min(1)
    @Max(15)
    amount: number;

    @MaxLength(300)
    comment: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    updatedBy: number;
}