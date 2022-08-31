import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { RequestMSG } from 'src/common/constants/time-off-messages';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateRequestMeDto } from './dto/create-request-me.dto';

@ApiTags('Timeoff Requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/requests')
export class RequestController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyRequest = this.clientProxy.clientProxyBalance();

  @Roles(Role.admin)
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.clientProxyRequest.send(RequestMSG.CREATE, createRequestDto);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post()
  createByUserJWT(@Auth() auth, @Body() createRequestMeDto: CreateRequestMeDto) {
    return this.clientProxyRequest.send(RequestMSG.CREATE, createRequestMeDto);
  }

  @Roles(Role.admin)
  @Get()
  findAll() {
    return this.clientProxyRequest.send(RequestMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAllByUserJWT(@Auth() auth) {
    return this.clientProxyRequest.send(RequestMSG.FIND_ALL_USER_ID, '');
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyRequest.send(RequestMSG.FIND_ONE, id);
  }
}
