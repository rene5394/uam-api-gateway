import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestDayService } from './request-day.service';
import { CreateRequestDayDto } from './dto/create-request-day.dto';
import { UpdateRequestDayDto } from './dto/update-request-day.dto';

@Controller('request-day')
export class RequestDayController {
  constructor(private readonly requestDayService: RequestDayService) {}

  @Post()
  create(@Body() createRequestDayDto: CreateRequestDayDto) {
    return this.requestDayService.create(createRequestDayDto);
  }

  @Get()
  findAll() {
    return this.requestDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestDayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDayDto: UpdateRequestDayDto) {
    return this.requestDayService.update(+id, updateRequestDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestDayService.remove(+id);
  }
}
