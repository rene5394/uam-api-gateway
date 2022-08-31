import { PartialType } from '@nestjs/swagger';
import { CreateRequestDayDto } from './create-request-day.dto';

export class UpdateRequestDayDto extends PartialType(CreateRequestDayDto) {}
