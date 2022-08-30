import { PartialType } from '@nestjs/swagger';
import { CreateBalanceTransactionDto } from './create-balance-transaction.dto';

export class UpdateBalanceTransactionDto extends PartialType(CreateBalanceTransactionDto) {}
