import { Module } from '@nestjs/common';
import { GetQrService } from './get-qr.service';
import { GetQrController } from './get-qr.controller';

@Module({
  controllers: [GetQrController],
  providers: [GetQrService]
})
export class GetQrModule {}
