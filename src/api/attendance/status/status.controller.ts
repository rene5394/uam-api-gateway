import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { StatusMSG } from 'src/common/constants/attendance-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Attendance Statuses')
@Controller('v1/attendance/status')
export class StatusController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyAttendance = this.clientProxy.clientProxyAttendance();

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return '';
  }

  @Get()
  findAll() {
    return this.clientProxyAttendance.send(StatusMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyAttendance.send(StatusMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return '';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return '';
  }
}
