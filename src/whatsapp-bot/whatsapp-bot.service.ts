import { Injectable } from '@nestjs/common';
import { createBot, createProvider, createFlow } from '@bot-whatsapp/bot';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma.service';
import { isDecimal } from 'class-validator';
import { menuMessages } from './utils/messages';
// @ts-ignore
const BaileysProvider = require('@bot-whatsapp/provider/baileys');

// @ts-ignore
const JsonFileAdapter = require('@bot-whatsapp/database/json');

@Injectable()
export class WhatsappBotService {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly PrismaService: PrismaService,
  ) {}

  async connectToWhatsApp(name: string) {
    const adapterDB = new JsonFileAdapter();
    const adapterFlow = createFlow([]);
    const adapterProvider = createProvider(BaileysProvider, {
      name:`botFiles/${name}`,
    });

    const { providerClass: bot } = await createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    });

    
    bot.on('message', async (ctx) => {
      let { remoteJid, fromMe, id } = ctx.key;

      let {body} = ctx;
   
      let { menuOption } = await this.getConsumer(remoteJid);

      if (menuOption === 0) {
        const num= Number(body)

        if ([1,2].includes(num)) {

          if(num === 1){
            await this.updateMenuPosition(remoteJid, num);
            await bot.sendMessage(remoteJid,menuMessages[num][0], {});
            return
          }

          if(num === 2){
            await bot.sendMessage(remoteJid, menuMessages[2][0], {});
            await bot.sendMessage(remoteJid, menuMessages[0][0], {});
            return
          }

        }
        await bot.sendMessage(remoteJid, menuMessages[0][1], {});
        await bot.sendMessage(remoteJid, menuMessages[0][0], {});
        return
      }

      if (menuOption === 1) {
        body = this.stringToNumber(body);
        if (isNaN(body)){
          await bot.sendMessage(remoteJid, menuMessages[1][1], {});
          await bot.sendMessage(remoteJid, menuMessages[1][0], {});
          return
        }       
        await bot.sendMessage(remoteJid, menuMessages[1][2](body), {});
        await this.updateMenuPosition(remoteJid, 0);
        await bot.sendMessage(remoteJid, menuMessages[0][0], {});
        return
      }

    });

    bot.on('require_action', async (ctx) => {
      this.eventEmitter.emit('new.qr', 'update');
    });

    bot.on('ready', async (ctx) => {
      this.eventEmitter.emit('remove.qr', name);
    });
  }


  async getConsumer(remoteJid: string) {
    let consumer = await this.PrismaService.consumer.findUnique({
      where: {
        remoteJid,
      },
    });

    if (!consumer) {
      consumer = await this.PrismaService.consumer.create({
        data: {
          remoteJid,
          menuOption: 0,
        },
      });
    }

    return consumer;
  }

 
  async updateMenuPosition(remoteJid: string, menuOption: number) {
      await this.PrismaService.consumer.update({
        where: {
          remoteJid,
        },
        data: {
          menuOption,
        },
      });
  }

  stringToNumber(amount: string) {
    let splitAmount = amount.split(',');

    if (splitAmount.length > 2) return false;

    let formatAmount = amount.replace('.', '').replace(',', '.');

    if (isDecimal(formatAmount)) {
      return Number(formatAmount);
    }

    return NaN;
  }

}
