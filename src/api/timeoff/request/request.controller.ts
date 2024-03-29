import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Hrs } from 'src/common/decorators/hr.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { UnpluggedService } from 'src/api/email/unplugged/unplugged.service';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateRequestMeDto } from './dto/create-request-me.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { RequestMSG } from 'src/common/constants/time-off-messages';
import { UserMSG } from 'src/common/constants/team-messages';

@ApiTags('Timeoff Requests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/requests')
export class RequestController {
  constructor(
    private readonly clientProxy: ClientProxies,
    private readonly emailService: UnpluggedService
  ) {}

  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();
  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Roles(Role.admin)
  @Post()
  async create(@Auth() auth, @Body() createRequestDto: CreateRequestDto) {
    createRequestDto.createdBy = auth.userId;

    const user = this.clientProxyTeam.send(UserMSG.FIND_ONE, createRequestDto.userId);
    const userFound  = await lastValueFrom(user)
      .then((value: any) => {
        return value;
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

    if (!userFound) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    createRequestDto.roleId = userFound.role_id;
    createRequestDto.coachApproval = 1;

    const request = this.clientProxyTimeOff.send(RequestMSG.CREATE, createRequestDto);
    const requestCreated = await lastValueFrom(request)
      .then((value: any) => {
        return value;
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

      if (!requestCreated) {
        throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
      }

      const emailData = {
        user: userFound,
        request: requestCreated
      }

      this.emailService.requestCreatedByHr(emailData);
    
    return requestCreated;
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Post('/user/coach')
  async createByCoach(@Auth() auth, @Body() createRequestDto: CreateRequestDto) {
    createRequestDto.createdBy = auth.userId;

    const user = this.clientProxyTeam.send(UserMSG.FIND_ONE, createRequestDto.userId);
    const userFound  = await lastValueFrom(user)
      .then((value: any) => {
        return value;
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

    if (!userFound) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    createRequestDto.roleId = userFound.role_id;
    createRequestDto.coachApproval = 1;

    const request = this.clientProxyTimeOff.send(RequestMSG.CREATE_COACH, createRequestDto);
    const requestCreated = await lastValueFrom(request)
      .then((value: any) => {
        return value;
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

      if (!requestCreated) {
        throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
      }

      const emailData = {
        user: userFound,
        request: requestCreated
      }

      this.emailService.requestCreatedByCoach(emailData);
    
    return requestCreated;
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post('/user/me')
  async createByUserJWT(@Auth() auth, @Body() createRequestMeDto: CreateRequestMeDto): Promise<Observable<Request>> {
    createRequestMeDto.userId = auth.userId;
    createRequestMeDto.createdBy = auth.userId;
    createRequestMeDto.roleId = auth.roleId;
    createRequestMeDto.coachApproval = 0;

    const request = this.clientProxyTimeOff.send(RequestMSG.CREATE_USER, createRequestMeDto);
    const requestCreated = await lastValueFrom(request)
      .then((value: any) => {
        return value;
      })
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

    if (!requestCreated) {
      throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
    }

    const emailData = {
      user: auth,
      request: requestCreated
    }

    this.emailService.requestCreatedByUser(emailData);
    
    return requestCreated;
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get()
  findAll(@Query() queryParams) {
    const status = (queryParams.status) ? queryParams.status : '';
    const transactionStatus = (queryParams.transactionStatus) ? queryParams.transactionStatus : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const userIds = (queryParams.userIds) ? queryParams.userIds : '';
    const startDate = (queryParams.startDate) ? queryParams.startDate : '';
    const endDate = (queryParams.endDate) ? queryParams.endDate : '';
    const findParams = { status, transactionStatus, page, userIds, startDate, endDate };    
    
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
  findAllByUserId(@Param('userId') userId: number, @Query('status') statusQuery) {
    const status = (statusQuery) ? statusQuery : '';
    const findParams = { userId, status };

    return this.clientProxyTimeOff.send(RequestMSG.FIND_ALL_USER_ID, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get('year/:year/month/:month')
  findRequestsByYearAndMonth(@Param() findParams) {
    return this.clientProxyTimeOff.send(RequestMSG.FIND_REQUEST_YEAR_AND_MONTH, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
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

  @Roles(Role.admin, Role.coach, Role.jrCoach)
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
