import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@ApiTags('Timeoff Requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/requests')
export class RequestController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyRequest = this.clientProxy.clientProxyBalance();

  @Roles(Role.admin)
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post()
  createByUserJWT(@Auth() auth, @Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Roles(Role.admin)
  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAllByUserJWT(@Auth() auth) {
    return this.requestService.findAll();
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.requestService.findOne(+id);
  }
}
