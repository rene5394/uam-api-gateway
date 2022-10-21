import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { BalanceMSG } from 'src/common/constants/time-off-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';
import { lastValueFrom, Observable } from 'rxjs';

@ApiTags('Timeoff Balances')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/balances')
export class BalanceController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();

  @Roles(Role.admin)
  @Post()
  async create(@Body() createBalanceDto: CreateBalanceDto) {
    try {
      const balance = this.clientProxyTimeOff.send(BalanceMSG.CREATE, createBalanceDto);
      const balanceFound = await lastValueFrom(balance);

      return balanceFound;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get()
  findAll(@Query() queryParams): Observable<Balance[]> {
    const userIds = (queryParams.userIds) ? queryParams.userIds : '';
    const page = (queryParams.page) ? queryParams.page : '';
    const findParams = { userIds, page };
    
    return this.clientProxyTimeOff.send(BalanceMSG.FIND_ALL, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<Balance>> {
    const balance = this.clientProxyTimeOff.send(BalanceMSG.FIND_ONE, id);

    const balanceFound = await new Promise<boolean>(resolve =>
      balance.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

    if (!balanceFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return balance;
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/me')
  async findOneByUserJWT(@Auth() auth): Promise<Observable<Balance>> {
    const balance = this.clientProxyTimeOff.send(BalanceMSG.FIND_ONE_USER_ID, auth.userId);

    const balanceFound = await new Promise<boolean>(resolve =>
       balance.subscribe(result => {
         if (!result) {
          resolve(false);
         }
        
         resolve(true);
       })
    );

    if (!balanceFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return balance;
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Get('/user/:userId')
  async findOneByUserId(@Param('userId') userId: number): Promise<Observable<Balance>> {
    const balance = this.clientProxyTimeOff.send(BalanceMSG.FIND_ONE_USER_ID, userId);

    const balanceFound = await new Promise<any>(resolve =>
      balance.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
   );

   if (!balanceFound) {
     throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
   }

   return balance;
  }

  @Roles(Role.admin)
  @Patch(':id')
  async update(@Auth() auth, @Param('id') id: number, @Body() updateBalanceDto: UpdateBalanceDto) {
    try {
      const updatedBy = auth.userId;
      const balance = this.clientProxyTimeOff.send(BalanceMSG.UPDATE, { id, updatedBy, updateBalanceDto });
      const balanceFound = await lastValueFrom(balance);

      return balanceFound;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.admin)
  @Patch('/user/:userId')
  updateByUserId(@Param('id') userId: number, @Body() updateBalanceDto: UpdateBalanceDto) {
    return this.clientProxyTimeOff.send(BalanceMSG.UPDATE_USER_ID, { userId, updateBalanceDto });
  }
}
