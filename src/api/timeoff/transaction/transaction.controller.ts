import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { RequestMSG, TransctionMSG } from '../../../common/constants/time-off-messages';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { CreateEntriesDto } from 'src/api/attendance/entry/dto/create-entries.dto';
import { EmployeeMSG, TeamMSG } from 'src/common/constants/team-messages';
import { TransactionStatus } from 'src/common/enums/transactionStatus.enum';
import { EntryMSG } from 'src/common/constants/attendance-messages';
import { timeOffTypeToAttendanceStatus } from 'src/common/utils/attendanceStatusValidation';

@ApiTags('Timeoff Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/transactions')
export class TransactionController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyAttendance = this.clientProxy.clientProxyAttendance();
  private clientProxyTeam = this.clientProxy.clientProxyTeam();
  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();

  @Roles(Role.admin, Role.coach, Role.jrCoach)
  @Post()
  async create(@Auth() auth, @Body() createTransactionDto: CreateTransactionDto): Promise<Observable<Transaction>> {
    createTransactionDto.createdBy = auth.userId;
    const roleId = auth.roleId;
    const hr = auth.hr;
    const createData = { roleId, hr, createTransactionDto };

    try {
      const transaction = this.clientProxyTimeOff.send(TransctionMSG.CREATE, createData);
      const transactionCreated = await lastValueFrom(transaction);

      if (transactionCreated.transactionStatusId === TransactionStatus.approvedByHR) {
        if (!transactionCreated) {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }
  
        const request = this.clientProxyTimeOff.send(RequestMSG.FIND_ONE, transactionCreated.requestId);
        const requestFound = await lastValueFrom(request);
  
        if (!requestFound) {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }
  
        const employee = this.clientProxyTeam.send(EmployeeMSG.FIND_ONE_USER_ID, requestFound.userId);
        const employeeFound = await lastValueFrom(employee);
  
        if (!employeeFound) {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }
  
        const team = this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, requestFound.userId);
        const teamFound = await lastValueFrom(team);
  
        if (!teamFound) {
          throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }

        const attendanceStatus = timeOffTypeToAttendanceStatus(requestFound.typeId);
  
        const createAttendanceEntriesDto = {
          employee_id: employeeFound.id,
          team_id: teamFound.id,
          startDate: requestFound.startDate,
          endDate: requestFound.endDate,
          user_id: requestFound.userId,
          attendance_status: attendanceStatus
        } as CreateEntriesDto;
  
        const entries = this.clientProxyAttendance.send(EntryMSG.CREATE_BULK, createAttendanceEntriesDto);
        await lastValueFrom(entries);
      }

      return transactionCreated;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.admin)
  @Get()
  findAll(): Observable<Transaction[]> {
    return this.clientProxyTimeOff.send(TransctionMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('/user/me')
  findAllByUserJWT(@Auth() auth): Observable<Transaction[]> {
    return this.clientProxyTimeOff.send(TransctionMSG.FIND_ALL_USER_ID, auth.userId);
  }

  @Roles(Role.admin)
  @Get('/user/:userId')
  findAllByUserId(@Param('userId') userId: number): Observable<Transaction[]> {
    return this.clientProxyTimeOff.send(TransctionMSG.FIND_ALL_USER_ID, userId);
  }

  @Roles(Role.admin)
  @Get(':requestId')
  findAllByRequestId(@Param('requestId') requestId: number): Observable<Transaction[]> {
    return this.clientProxyTimeOff.send(TransctionMSG.FIND_ALL_REQUEST_ID, requestId);
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Transaction> {
    return this.clientProxyTimeOff.send(TransctionMSG.FIND_ONE, id);
  }
}
