import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeService.findOne(id);
  }
}
