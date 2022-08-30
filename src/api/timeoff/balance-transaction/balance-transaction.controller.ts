import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceTransactionService } from './balance-transaction.service';
import { CreateBalanceTransactionDto } from './dto/create-balance-transaction.dto';
import { UpdateBalanceTransactionDto } from './dto/update-balance-transaction.dto';

@Controller('balance-transaction')
export class BalanceTransactionController {
  constructor(private readonly balanceTransactionService: BalanceTransactionService) {}

  @Post()
  create(@Body() createBalanceTransactionDto: CreateBalanceTransactionDto) {
    return this.balanceTransactionService.create(createBalanceTransactionDto);
  }

  @Get()
  findAll() {
    return this.balanceTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanceTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceTransactionDto: UpdateBalanceTransactionDto) {
    return this.balanceTransactionService.update(+id, updateBalanceTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanceTransactionService.remove(+id);
  }
}
