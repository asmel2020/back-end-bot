import { Module } from '@nestjs/common';
import { WhatsappBotService } from './whatsapp-bot.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [],
  imports: [],
  providers: [WhatsappBotService,PrismaService]
})
export class WhatsappBotModule {}
