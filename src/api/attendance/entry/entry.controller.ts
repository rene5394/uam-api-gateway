import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EntryMSG } from 'src/common/constants/attendance-messages';
import { ClientProxyAttendance } from 'src/common/proxy/client-proxy-attendance';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@ApiTags('Attendance Entries')
@Controller('v1/attendance/entries')
export class EntryController {
  constructor(private readonly clientProxy: ClientProxyAttendance) {}

  private clientProxyEntry = this.clientProxy.clientProxyEntry();

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.clientProxyEntry.send(EntryMSG.CREATE, createEntryDto);
  }

  @Get()
  findAll() {
    return this.clientProxyEntry.send(EntryMSG.FIND_ALL, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyEntry.send(EntryMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.clientProxyEntry.send(EntryMSG.UPDATE, { id, updateEntryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return '';
  }
}
