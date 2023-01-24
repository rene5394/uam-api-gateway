import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UnpluggedMSG } from 'src/common/constants/email-messages';
import { SupportTeamMemberMSG, TeamMSG, UserMSG } from 'src/common/constants/team-messages';
import { Role } from 'src/common/enums/role.enum';
import { SupportTeam } from 'src/common/enums/supportTeams.enum';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { SupportTeamMember } from '../../team/support-team-member/entities/support-team-member.entity';
import { User } from '../../team/user/entities/user.entity';
import { TypeMSG } from 'src/common/constants/time-off-messages';
import { TransactionStatus } from 'src/common/enums/transactionStatus.enum';

@Injectable()
export class UnpluggedService {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();
  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();
  private clientProxyEmail = this.clientProxy.clientProxyEmail();

  async balanceUpdatedBySystem(emailData: any) {    
    const email = this.clientProxyEmail.send(UnpluggedMSG.UPDATE_BALANCE_SYSTEM_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }

  async balanceUpdatedByHR(emailData: any) {
    const email = this.clientProxyEmail.send(UnpluggedMSG.UPDATE_BALANCE_HR_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }

  async requestCreatedByUser(emailData: any) {
    const types = this.clientProxyTimeOff.send(TypeMSG.FIND_ALL, '');
    const typeFound = await lastValueFrom(types);

    typeFound.forEach(async type => {
      if (emailData.request.typeId == type.id) {
        emailData.requestType = type.name;
      }
    });

    if (emailData.user.roleId === Role.admin || emailData.user.roleId === Role.coach) {
      const findParamsSupportTeamMembers = { supportTeamId: SupportTeam.HR, status: 'active' };
      const supportTeamMembers = this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL_SUPPORT_TEAM_ID, findParamsSupportTeamMembers);
      const supportTeamMembersFound = await lastValueFrom(supportTeamMembers);

      const employeeIds: any = [];
      supportTeamMembersFound.map((supportTeamMember: SupportTeamMember) => employeeIds.push(supportTeamMember.employee_id));
      const findParamsUsers = { employeeIds };

      const users = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParamsUsers);
      const { list: usersFound }  = await lastValueFrom(users);

      const hrEmails: any = [];
      usersFound.map((user: User) => hrEmails.push(user.email));
      emailData.hrEmails = hrEmails;
    } if (emailData.user.roleId === Role.jrCoach) {
      const findParamsSupportTeamMembers = { supportTeamId: SupportTeam.HR, status: 'active' };
      const supportTeamMembers = this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL_SUPPORT_TEAM_ID, findParamsSupportTeamMembers);
      const supportTeamMembersFound = await lastValueFrom(supportTeamMembers);

      const employeeIds: any = [];
      supportTeamMembersFound.map((supportTeamMember: SupportTeamMember) => employeeIds.push(supportTeamMember.employee_id));
      const findParamsUsers = { employeeIds };

      const hrUsers = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParamsUsers);
      const { list: hrUsersFound }  = await lastValueFrom(hrUsers);

      const hrEmails: any = [];
      hrUsersFound.map((user: User) => hrEmails.push(user.email));
      emailData.hrEmails = hrEmails;

      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, emailData.request.userId);
      const teamFound = await lastValueFrom(team);
      
      const coachUser = this.clientProxyTeam.send(UserMSG.FIND_ONE_EMPLOYEE_ID, teamFound.employee_id);
      const coachUserFound = await lastValueFrom(coachUser);

      emailData.coachEmail = coachUserFound.email;
    } if (emailData.user.roleId === Role.va) {
      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, emailData.request.userId);
      const teamFound = await lastValueFrom(team);

      const coachUser = this.clientProxyTeam.send(UserMSG.FIND_ONE_EMPLOYEE_ID, teamFound.employee_id);
      const coachUserFound = await lastValueFrom(coachUser);

      emailData.coachEmail = coachUserFound.email;
    }

    const email = this.clientProxyEmail.send(UnpluggedMSG.CREATE_REQUEST_USER_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }

  async requestCreatedByCoach(emailData: any) {
    const types = this.clientProxyTimeOff.send(TypeMSG.FIND_ALL, '');
    const typeFound = await lastValueFrom(types);

    typeFound.forEach(async type => {
      if (emailData.request.typeId == type.id) {
        emailData.requestType = type.name;
      }
    });

    const findParamsSupportTeamMembers = { supportTeamId: SupportTeam.HR, status: 'active' };
    const supportTeamMembers = this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL_SUPPORT_TEAM_ID, findParamsSupportTeamMembers);
    const supportTeamMembersFound = await lastValueFrom(supportTeamMembers);

    const employeeIds: any = [];
    supportTeamMembersFound.map((supportTeamMember: SupportTeamMember) => employeeIds.push(supportTeamMember.employee_id));
    const findParamsUsers = { employeeIds };

    const hrUsers = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParamsUsers);
    const { list: hrUsersFound }  = await lastValueFrom(hrUsers);

    const hrEmails: any = [];
    hrUsersFound.map((user: User) => hrEmails.push(user.email));
    emailData.hrEmails = hrEmails;

    const email = this.clientProxyEmail.send(UnpluggedMSG.CREATE_REQUEST_COACH_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }

  async requestCreatedByHr(emailData: any) {
    const types = this.clientProxyTimeOff.send(TypeMSG.FIND_ALL, '');
    const typeFound = await lastValueFrom(types);

    typeFound.forEach(async type => {
      if (emailData.request.typeId == type.id) {
        emailData.requestType = type.name;
      }
    });

    if (emailData.user.role_id === Role.jrCoach || emailData.user.role_id === Role.va) {
      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, emailData.request.userId);
      const teamFound = await lastValueFrom(team);
      
      const coachUser = this.clientProxyTeam.send(UserMSG.FIND_ONE_EMPLOYEE_ID, teamFound.employee_id);
      const coachUserFound = await lastValueFrom(coachUser);

      emailData.coachEmail = coachUserFound.email;
    }

    const email = this.clientProxyEmail.send(UnpluggedMSG.CREATE_REQUEST_HR_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }

  async requestUpdated(emailData: any) {
    const types = this.clientProxyTimeOff.send(TypeMSG.FIND_ALL, '');
    const typeFound = await lastValueFrom(types);

    typeFound.forEach(async type => {
      if (emailData.request.typeId == type.id) {
        emailData.requestType = type.name;
      }
    });
    
    if (emailData.transaction.transactionStatusId === TransactionStatus.approvedByTL ||
        emailData.transaction.transactionStatusId === TransactionStatus.deniedByTL) {
      const findParamsSupportTeamMembers = { supportTeamId: SupportTeam.HR, status: 'active' };
      const supportTeamMembers = this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL_SUPPORT_TEAM_ID, findParamsSupportTeamMembers);
      const supportTeamMembersFound = await lastValueFrom(supportTeamMembers);

      const employeeIds: any = [];
      supportTeamMembersFound.map((supportTeamMember: SupportTeamMember) => employeeIds.push(supportTeamMember.employee_id));
      const findParamsUsers = { employeeIds };

      const users = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParamsUsers);
      const { list: usersFound }  = await lastValueFrom(users);

      const hrEmails: any = [];
      usersFound.map((user: User) => hrEmails.push(user.email));
      emailData.hrEmails = hrEmails;
    } if (emailData.transaction.transactionStatusId === TransactionStatus.approvedByHR ||
          emailData.transaction.transactionStatusId === TransactionStatus.deniedByHR ||
          emailData.transaction.transactionStatusId === TransactionStatus.cancelledByHR) {
      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, emailData.request.userId);
      const teamFound = await lastValueFrom(team);
      
      const coachUser = this.clientProxyTeam.send(UserMSG.FIND_ONE_EMPLOYEE_ID, teamFound.employee_id);
      const coachUserFound = await lastValueFrom(coachUser);

      emailData.coachEmail = coachUserFound.email;
    }

    const email = this.clientProxyEmail.send(UnpluggedMSG.UPDATE_REQUEST_EMAIL, emailData);
    const emailSent = await lastValueFrom(email);
  }
}
