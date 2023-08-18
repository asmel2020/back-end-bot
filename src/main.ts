import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WhatsappBotService } from './whatsapp-bot/whatsapp-bot.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  const whatsappBotService = app.get(WhatsappBotService);
  const configService = app.get(ConfigService);
  await whatsappBotService.connectToWhatsApp('bot-whatsapp');
  await app.listen(configService.get<number>('port'));
}
bootstrap();
