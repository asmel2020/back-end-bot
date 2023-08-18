import { Controller, MessageEvent, Sse, Get, Res, Param } from '@nestjs/common';
import { GetQrService } from './get-qr.service';
import { fromEvent, interval, Observable } from 'rxjs';
import { map, buffer } from 'rxjs/operators';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Controller('get-qr')
export class GetQrController {
  constructor(
    private readonly getQrService: GetQrService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('qr')
  async getQr(@Res() res: Response) {
    const pathQr = join(process.cwd(), 'botFiles/bot-whatsapp.qr.png');
    let file
    if (existsSync(pathQr)) {
      file = createReadStream(pathQr);
      file.pipe(res);
    } else {
      return res.status(404).send({message: 'QR no disponible'});
    }
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'new.qr').pipe(
      map((qr) => {
        return { data: qr } as MessageEvent;
      }),
    );
  }
}
