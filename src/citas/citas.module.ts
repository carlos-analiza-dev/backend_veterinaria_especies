import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Medico } from 'src/medicos/entities/medico.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { HorariosMedico } from 'src/horarios_medicos/entities/horarios_medico.entity';
import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { SubServicio } from 'src/sub_servicios/entities/sub_servicio.entity';
import { User } from 'src/auth/entities/auth.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CitasController],
  imports: [
    TypeOrmModule.forFeature([
      Cita,
      Medico,
      FincasGanadero,
      HorariosMedico,
      AnimalFinca,
      SubServicio,
      User,
    ]),
  ],
  providers: [CitasService, MailService],
})
export class CitasModule {}
