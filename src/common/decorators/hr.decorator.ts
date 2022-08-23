import { SetMetadata } from '@nestjs/common';
import { Hr } from '../enums/hr.enum';

export const HRS_KEY = 'hr';
export const Hrs = (...hrs: Hr[]) => SetMetadata(HRS_KEY, hrs);