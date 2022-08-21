import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQ } from '../constants/rabbitmq';

@Injectable()
export class ClientProxyProxyAttendance  {
  constructor(private readonly configService: ConfigService) {}

  clientProxyEntrie(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.AttendanceEntrieQueue
      }
    })
  }
}