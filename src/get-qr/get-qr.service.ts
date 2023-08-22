import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { join } from 'path';
import * as fs from 'fs';
@Injectable()
export class GetQrService {

   



    @OnEvent('remove.qr')
    event(nameQr:string){
      const pathQr=join(process.cwd(),`botFiles/${nameQr}.qr.png`)
      if(fs.existsSync(pathQr)){
        fs.rmSync(pathQr);
        return
      }
    }
}
