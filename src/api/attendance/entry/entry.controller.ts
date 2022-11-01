import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EntryMSG } from 'src/common/constants/attendance-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateEntriesDto } from './dto/create-entries.dto';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@ApiTags('Attendance Entries')
@Controller('v1/attendance/entries')
export class EntryController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyAttendance = this.clientProxy.clientProxyAttendance();

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.clientProxyAttendance.send(EntryMSG.CREATE, createEntryDto);
  }


  @Post('bulk')
  createBulk(@Body() createEntryDto: CreateEntriesDto) {
    return this.clientProxyAttendance.send(EntryMSG.CREATE_BULK, createEntryDto);
  }

  @Get()
  findAll() {
    return this.clientProxyAttendance.send(EntryMSG.FIND_ALL, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyAttendance.send(EntryMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.clientProxyAttendance.send(EntryMSG.UPDATE, { id, updateEntryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return '';
  }
}
