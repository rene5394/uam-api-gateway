import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HRS_KEY } from '../../common/decorators/hr.decorator';
import { Hr } from '../../common/enums/hr.enum';

@Injectable()
export class HrsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredHr = this.reflector.getAllAndOverride<Hr[]>(HRS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredHr) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    
    return requiredHr.includes(user.hr);
  }
}