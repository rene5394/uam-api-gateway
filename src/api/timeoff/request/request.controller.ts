import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { RequestMSG } from 'src/common/constants/time-off-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateRequestMeDto } from './dto/create-request-me.dto';
import { Hrs } from 'src/common/decorators/hr.decorator';
import { lastValueFrom, Observable } from 'rxjs';

@ApiTags('Timeoff Requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/requests')
export class RequestController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();

  @Roles(Role.admin)
  @Post()
  async create(@Auth() auth, @Body() createRequestDto: CreateRequestDto) {
    createRequestDto.createdBy = auth.userId;

    try {
      const request = this.clientProxyTimeOff.send(RequestMSG.CREATE, createRequestDto);
      const requestFound = await lastValueFrom(request);
      
      return requestFound;
    } catch (err) {

      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post('/user/me')
  async createByUserJWT(@Auth() auth, @Body() createRequestMeDto: CreateRequestMeDto): Promise<Observable<Request>> {
    createRequestMeDto.userId = auth.userId;
    createRequestMeDto.createdBy = auth.userId;
    createRequestMeDto.roleId = auth.roleId;

    try {
      const request = this.clientProxyTimeOff.send(RequestMSG.CREATE_USER_ID, createRequestMeDto);
      const requestFound = await lastValueFrom(request);
      
      return requestFound;
    } catch (err) {
      
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get()
  findAll(@Query() queryParams) {
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const userIds = (queryParams.userIds) ? queryParams.userIds : '';
    const startDate = (queryParams.startDate) ? queryParams.startDate : '';
    const endDate = (queryParams.endDate) ? queryParams.endDate : '';
    const findParams = { status, page, userIds, startDate, endDate };
    
    return this.clientProxyTimeOff.send(RequestMSG.FIND_ALL, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/me')
  findAllByUserJWT(@Auth() auth, @Query('status') statusQuery) {
    const status = (statusQuery) ? statusQuery : '';
    const findParams = { userId: auth.userId, status: status };

    return this.clientProxyTimeOff.send(RequestMSG.FIND_ALL_USER_ID, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: number) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_ALL_USER_ID, userId);
  }

  @Roles(Role.admin)
  @Get('year/:year/month/:month')
  findRequestsByYearAndMonth(@Param() findParams) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_REQUEST_YEAR_AND_MONTH, findParams);
  }

  @Roles(Role.admin)
  @Get('startDate/:startDate/endDate/:endDate')
  findRequestsByDateRange(@Param() dateRange) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_REQUEST_DATE_RANGE, dateRange);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('count/year/:year/month/:month')
  findNumberOfRequestsByYearAndMonth(@Param() findParams) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_NUMBER_OF_REQUEST_YEAR_AND_MONTH, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('count/startDate/:startDate/endDate/:endDate')
  findNumberOfRequestsByDateRange(@Param() dateRange) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_NUMBER_OF_REQUEST_DATE_RANGE, dateRange);
  }

  @Roles(Role.admin)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const request = this.clientProxyTimeOff.send(RequestMSG.FIND_ONE, id);

    const requestFound = await new Promise<boolean>(resolve =>
      request.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

   if (!requestFound) {
     throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
   }

   return request;
  }
}
