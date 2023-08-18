import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WhatsappBotModule } from './whatsapp-bot/whatsapp-bot.module';
import { GetQrModule } from './get-qr/get-qr.module';
import configuration from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configuration],
  }),EventEmitterModule.forRoot(), WhatsappBotModule, GetQrModule]
  
})
export class AppModule {}
