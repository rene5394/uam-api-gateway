import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';

@ApiTags('Request Statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/statuses')
export class StatusController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyType = this.clientProxy.clientProxyStatus();

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }
}
