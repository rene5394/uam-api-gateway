import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionStatusService } from './transaction-status.service';
import { CreateTransactionStatusDto } from './dto/create-transaction-status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';

@Controller('transaction-status')
export class TransactionStatusController {
  constructor(private readonly transactionStatusService: TransactionStatusService) {}

  @Post()
  create(@Body() createTransactionStatusDto: CreateTransactionStatusDto) {
    return this.transactionStatusService.create(createTransactionStatusDto);
  }

  @Get()
  findAll() {
    return this.transactionStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return this.transactionStatusService.update(+id, updateTransactionStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionStatusService.remove(+id);
  }
}
