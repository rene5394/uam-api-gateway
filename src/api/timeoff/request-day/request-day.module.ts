import { Module } from '@nestjs/common';
import { RequestDayService } from './request-day.service';
import { RequestDayController } from './request-day.controller';

@Module({
  controllers: [RequestDayController],
  providers: [RequestDayService]
})
export class RequestDayModule {}
