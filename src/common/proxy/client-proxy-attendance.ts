import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQ } from '../constants/rabbitmq';

@Injectable()
export class ClientProxyAttendance  {
  constructor(private readonly configService: ConfigService) {}

  clientProxyEntry(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.AttendanceEntryQueue
      }
    });
  }

  clientProxyStatus(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.AttendanceStatusQueue
      }
    });
  }
}