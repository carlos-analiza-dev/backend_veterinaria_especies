import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorariosMedicoDto } from './dto/create-horarios_medico.dto';
import { UpdateHorariosMedicoDto } from './dto/update-horarios_medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HorariosMedico } from './entities/horarios_medico.entity';
import { Repository } from 'typeorm';
import { Medico } from 'src/medicos/entities/medico.entity';

@Injectable()
export class HorariosMedicosService {
  constructor(
    @InjectRepository(HorariosMedico)
    private readonly horario_repo: Repository<HorariosMedico>,
    @InjectRepository(Medico)
    private readonly medico_repo: Repository<Medico>,
  ) {}
  async create(createHorariosMedicoDto: CreateHorariosMedicoDto) {
    const { diaSemana, horaInicio, horaFin, medicoId, disponible } =
      createHorariosMedicoDto;
    try {
      const medico_exist = await this.medico_repo.findOne({
        where: { id: medicoId },
      });
      if (!medico_exist)
        throw new NotFoundException('No se encontro el medico seleccionado');

      const existeHorario = await this.horario_repo.findOne({
        where: {
          medico: { id: medicoId },
          diaSemana: diaSemana,
        },
      });

      if (existeHorario) {
        throw new NotFoundException(
          `Ya existe un horario registrado para este médico el día ${this.obtenerDia(
            diaSemana,
          )}.`,
        );
      }

      const horario = this.horario_repo.create({
        diaSemana,
        horaFin,
        horaInicio,
        disponible,
        medico: medico_exist,
      });
      await this.horario_repo.save(horario);
      return 'Horario creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all horariosMedicos`;
  }

  findOne(id: string) {
    return `This action returns a #${id} horariosMedico`;
  }

  async findByMedicoId(medicoId: string) {
    const medico = await this.medico_repo.findOne({
      where: { id: medicoId },
    });

    if (!medico) {
      throw new NotFoundException('No se encontró el médico especificado');
    }

    const horarios = await this.horario_repo.find({
      where: { medico: { id: medicoId } },
      order: { diaSemana: 'ASC', horaInicio: 'ASC' },
    });

    if (horarios.length === 0) {
      throw new NotFoundException('Este médico no tiene horarios registrados');
    }

    return horarios;
  }

  async update(id: string, updateHorariosMedicoDto: UpdateHorariosMedicoDto) {
    try {
      const horario = await this.horario_repo.findOne({
        where: { id },
        relations: ['medico'],
      });

      if (!horario) {
        throw new NotFoundException(`Horario con ID ${id} no encontrado`);
      }

      if (
        updateHorariosMedicoDto.diaSemana !== undefined &&
        updateHorariosMedicoDto.diaSemana !== horario.diaSemana
      ) {
        const existeHorario = await this.horario_repo.findOne({
          where: {
            medico: { id: horario.medico.id },
            diaSemana: updateHorariosMedicoDto.diaSemana,
          },
        });

        if (existeHorario && existeHorario.id !== id) {
          throw new NotFoundException(
            `Ya existe un horario registrado para este médico el día ${this.obtenerDia(
              updateHorariosMedicoDto.diaSemana,
            )}.`,
          );
        }
      }

      const updatedHorario = await this.horario_repo.save({
        ...horario,
        ...updateHorariosMedicoDto,
      });

      return updatedHorario;
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} horariosMedico`;
  }

  obtenerDia(dayNumber: number) {
    const days = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    return days[dayNumber] || '';
  }
}
