import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { EntryController } from './entry.controller';

@Module({
  imports: [ProxyModule],
  controllers: [EntryController]
})
export class EntrieModule {}
