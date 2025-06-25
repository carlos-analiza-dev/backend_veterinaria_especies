import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import {
  LessThan,
  LessThanOrEqual,
  Repository,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { Medico } from 'src/medicos/entities/medico.entity';
import { HorariosMedico } from 'src/horarios_medicos/entities/horarios_medico.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { SubServicio } from 'src/sub_servicios/entities/sub_servicio.entity';
import { User } from 'src/auth/entities/auth.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citas_repo: Repository<Cita>,
    @InjectRepository(Medico)
    private readonly medico_repo: Repository<Medico>,
    @InjectRepository(HorariosMedico)
    private readonly horarios_repo: Repository<HorariosMedico>,
    @InjectRepository(FincasGanadero)
    private readonly finca_ganadero: Repository<FincasGanadero>,
    @InjectRepository(AnimalFinca)
    private readonly animal_ganadero: Repository<AnimalFinca>,
    @InjectRepository(SubServicio)
    private readonly sub_servicio_repo: Repository<SubServicio>,
    @InjectRepository(User)
    private readonly user_repo: Repository<User>,
  ) {}

  async create(createCitaDto: CreateCitaDto) {
    const {
      medicoId,
      fecha,
      horaInicio,
      duracion = 1,
      animalId,
      cantidadAnimales,
      fincaId,
      subServicioId,
      totalPagar,
      usuarioId,
    } = createCitaDto;

    const [horas, minutos] = horaInicio.split(':').map(Number);
    const horaFin = `${(horas + duracion).toString().padStart(2, '0')}:${minutos
      .toString()
      .padStart(2, '0')}:00`;

    const fechaDate = new Date(fecha);
    const diaSemana = fechaDate.getDay();

    const horarioValido = await this.horarios_repo.findOne({
      where: {
        medico: { id: medicoId },
        diaSemana,
        disponible: true,
        horaInicio: LessThanOrEqual(horaInicio),
        horaFin: MoreThanOrEqual(horaFin),
      },
    });

    if (!horarioValido) {
      throw new BadRequestException('El médico no trabaja en ese horario');
    }

    const citasSolapadas = await this.citas_repo.find({
      where: {
        medico: { id: medicoId },
        fecha,
        horaInicio: LessThan(horaFin),
        horaFin: MoreThan(horaInicio),
      },
    });

    if (citasSolapadas.length > 0) {
      throw new BadRequestException(
        'El médico ya tiene una cita en ese horario',
      );
    }

    const animal_exist = await this.animal_ganadero.findOne({
      where: { id: animalId },
    });
    if (!animal_exist)
      throw new NotFoundException('No se encontro el animal seleccionado');

    const finca_exist = await this.finca_ganadero.findOne({
      where: { id: fincaId },
    });
    if (!finca_exist)
      throw new NotFoundException('No se encontro la finca seleccionada');

    const medico_exist = await this.medico_repo.findOne({
      where: { id: medicoId },
    });
    if (!medico_exist)
      throw new NotFoundException('No se encontro el medico seleccionado');

    const servicio_exist = await this.sub_servicio_repo.findOne({
      where: { id: subServicioId },
    });
    if (!servicio_exist)
      throw new NotFoundException(
        'El servicio seleccionado no esta disponible en este momento',
      );

    const usuario_exist = await this.user_repo.findOne({
      where: { id: usuarioId },
    });
    if (!usuario_exist)
      throw new NotFoundException(
        'El usuario seleccionado no esta disponible en este momento',
      );

    const nuevaCita = this.citas_repo.create({
      animal: animal_exist,
      cantidadAnimales,
      finca: finca_exist,
      medico: medico_exist,
      subServicio: servicio_exist,
      fecha,
      horaInicio: `${horaInicio}:00`,
      horaFin,
      duracion,
      totalPagar,
      user: usuario_exist,
    });

    return this.citas_repo.save(nuevaCita);
  }
  async getHorariosDisponibles(medicoId: string, fecha: string) {
    const medico = await this.medico_repo.findOneBy({ id: medicoId });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    const fechaDate = new Date(fecha);
    const diaSemana = fechaDate.getDay();

    const horariosMedico = await this.horarios_repo.find({
      where: {
        medico: { id: medicoId },
        diaSemana,
        disponible: true,
      },
      order: { horaInicio: 'ASC' },
    });

    if (horariosMedico.length === 0) {
      return [];
    }

    const citas = await this.citas_repo.find({
      where: {
        medico: { id: medicoId },
        fecha,
      },
      order: { horaInicio: 'ASC' },
    });

    const slotsDisponibles = [];
    const intervalo = 60;

    for (const horario of horariosMedico) {
      const [horaInicioHoras, horaInicioMins] = horario.horaInicio
        .split(':')
        .map(Number);
      const [horaFinHoras, horaFinMins] = horario.horaFin
        .split(':')
        .map(Number);

      let slotActual = new Date(fechaDate);
      slotActual.setHours(horaInicioHoras, horaInicioMins, 0, 0);

      const horarioFin = new Date(fechaDate);
      horarioFin.setHours(horaFinHoras, horaFinMins, 0, 0);

      while (slotActual < horarioFin) {
        const slotFin = new Date(slotActual);
        slotFin.setMinutes(slotActual.getMinutes() + intervalo);

        const horaInicioStr = slotActual.toTimeString().substr(0, 5);
        const horaFinStr = slotFin.toTimeString().substr(0, 5);

        const ocupado = citas.some((cita) =>
          this.horariosSeSolapan(
            cita.horaInicio,
            cita.horaFin,
            horaInicioStr,
            horaFinStr,
          ),
        );

        if (!ocupado && slotFin <= horarioFin) {
          slotsDisponibles.push({
            horaInicio: horaInicioStr,
            horaFin: horaFinStr,
          });
        }

        slotActual = new Date(slotFin);
      }
    }

    return slotsDisponibles;
  }

  async findAllByUser(id: string, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const usuario_exist = await this.user_repo.findOne({ where: { id } });
      if (!usuario_exist)
        throw new NotFoundException('No se encontró el usuario seleccionado.');

      const [citas, total] = await this.citas_repo.findAndCount({
        where: { user: { id } },
        relations: ['medico', 'animal', 'finca', 'subServicio'],
        take: limit,
        skip: offset,
        order: {
          fecha: 'DESC',
        },
      });
      if (citas.length === 0)
        throw new NotFoundException(
          'No se encontraron citas disponibles en este momento',
        );
      const cita_aplanada = instanceToPlain(citas);
      return {
        total,
        citas: cita_aplanada,
      };
    } catch (error) {
      throw error;
    }
  }

  private horariosSeSolapan(
    hIni1: string,
    hFin1: string,
    hIni2: string,
    hFin2: string,
  ): boolean {
    return hIni1 < hFin2 && hFin1 > hIni2;
  }
}
