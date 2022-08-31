import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQ } from '../constants/rabbitmq';

@Injectable()
export class ClientProxyTimeOff  {
  constructor(private readonly configService: ConfigService) {}

  clientProxyBalance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.TimeOffBalanceQueue
      }
    });
  }

  clientProxyBalanceTransaction(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.TimeOffBalanceQueue
      }
    });
  }

  clientProxyRequest(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.TimeOffRequestQueue
      }
    });
  }

  clientProxyStatus(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.TimeOffStatusQueue
      }
    });
  }

  clientProxyType(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: this.configService.get('AMQP_URL'),
          queue: RabbitMQ.TimeOffTypeQueue
      }
    });
  }
}