import { Module } from '@nestjs/common';
import { HorariosTrabajoService } from './horarios_trabajo.service';
import { HorariosTrabajoController } from './horarios_trabajo.controller';

@Module({
  controllers: [HorariosTrabajoController],
  providers: [HorariosTrabajoService],
})
export class HorariosTrabajoModule {}
