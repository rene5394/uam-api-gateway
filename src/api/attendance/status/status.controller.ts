import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { StatusMSG } from 'src/common/constants/attendance-messages';
import { ClientProxyAttendance } from 'src/common/proxy/client-proxy-attendance';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Attendance Statuses')
@Controller('v1/attendance/status')
export class StatusController {
  constructor(private readonly clientProxy: ClientProxyAttendance) {}

  private clientProxyStatus = this.clientProxy.clientProxyStatus();

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return '';
  }

  @Get()
  findAll() {
    return this.clientProxyStatus.send(StatusMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyStatus.send(StatusMSG.FIND_ONE, id);
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
