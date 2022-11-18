import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UnpluggedMSG } from 'src/common/constants/email-messages';
import { TeamMSG } from 'src/common/constants/team-messages';
import { Role } from 'src/common/enums/role.enum';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@Injectable()
export class EmailService {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();
  private clientProxyEmail = this.clientProxy.clientProxyEmail();

  async createRequestEmail(emailData: any) {
    if (emailData.roleId === Role.admin || emailData.roleId === Role.coach) {
      emailData.hrEmails = ['ale@uassistme.com', 'georgina@uassistme.com'];
      
      const email = this.clientProxyEmail.send(UnpluggedMSG.CREATE_REQUEST_USER_EMAIL, emailData);
      const emailSent = await lastValueFrom(email);
    } if (emailData.roleId === Role.jrCoach) {
      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, '');
      const teamFound = await lastValueFrom(team);

      emailData.hrEmails = ['ale@uassistme.com', 'georgina@uassistme.com'];
      emailData.coachEmail = 'walterc@uassistme.com';
    } if (emailData.roleId === Role.va) {
      const team =  this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, '');
      const teamFound = await lastValueFrom(team);

      emailData.coachEmail = 'walterc@uassistme.com';
      const email = this.clientProxyEmail.send(UnpluggedMSG.CREATE_REQUEST_USER_EMAIL, emailData);
      const emailSent = await lastValueFrom(email);
    }
  }
}
