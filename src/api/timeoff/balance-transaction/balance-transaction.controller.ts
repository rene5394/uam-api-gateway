import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { CreateBalanceTransactionDto } from './dto/create-balance-transaction.dto';
import { UpdateBalanceTransactionDto } from './dto/update-balance-transaction.dto';

@ApiTags('Balance Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
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
