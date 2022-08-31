import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';

@ApiTags('Request Statuses')
@Controller('v1/timeoff/statuses')
export class StatusController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyType = this.clientProxy.clientProxyStatus();

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }
}
