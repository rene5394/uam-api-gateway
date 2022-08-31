import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';

@ApiTags('Request Types')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeService.findOne(id);
  }
}
