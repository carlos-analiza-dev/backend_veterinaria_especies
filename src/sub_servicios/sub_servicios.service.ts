import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubServicioDto } from './dto/create-sub_servicio.dto';
import { UpdateSubServicioDto } from './dto/update-sub_servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubServicio } from './entities/sub_servicio.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Injectable()
export class SubServiciosService {
  constructor(
    @InjectRepository(SubServicio)
    private readonly sub_servicio_repo: Repository<SubServicio>,
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}
  async create(createSubServicioDto: CreateSubServicioDto) {
    const { nombre, descripcion, servicioId, isActive } = createSubServicioDto;
    try {
      const servicio_existe = await this.servicioRepo.findOne({
        where: { id: servicioId },
      });
      if (!servicio_existe)
        throw new NotFoundException('No se encontro el servicio seleccionado');
      const sub_Servicio = this.sub_servicio_repo.create({
        descripcion,
        isActive,
        nombre,
        servicio: servicio_existe,
      });
      await this.sub_servicio_repo.save(sub_Servicio);
      return 'Servicio creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(servicioId: string) {
    try {
      const servicio = await this.servicioRepo.findOne({
        where: { id: servicioId },
      });
      if (!servicio)
        throw new NotFoundException('No se encontro el servicio seleccionado');
      const sub_servicios = await this.sub_servicio_repo.find({
        where: {
          servicio,
        },
      });
      if (!sub_servicios || sub_servicios.length === 0) {
        throw new BadRequestException(
          'No se encontraron sub_servicios disponibles',
        );
      }
      return sub_servicios;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const sub_servicio = await this.sub_servicio_repo.findOne({
        where: {
          id,
        },
      });
      if (!sub_servicio) {
        throw new NotFoundException(
          'No se encontro el subservicio seleccionado',
        );
      }
      return sub_servicio;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSubServicioDto: UpdateSubServicioDto) {
    const { nombre, descripcion, isActive, servicioId } = updateSubServicioDto;

    try {
      const sub_servicio = await this.sub_servicio_repo.findOne({
        where: { id },
      });

      if (!sub_servicio) {
        throw new NotFoundException(
          'No se encontró el subservicio que desea actualizar',
        );
      }

      if (servicioId) {
        const servicio = await this.servicioRepo.findOne({
          where: { id: servicioId },
        });
        if (!servicio) {
          throw new NotFoundException('No se encontró el servicio relacionado');
        }
        sub_servicio.servicio = servicio;
      }

      if (nombre !== undefined) sub_servicio.nombre = nombre;
      if (descripcion !== undefined) sub_servicio.descripcion = descripcion;
      if (isActive !== undefined) sub_servicio.isActive = isActive;

      await this.sub_servicio_repo.save(sub_servicio);

      return {
        message: 'Subservicio actualizado correctamente',
        data: sub_servicio,
      };
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} subServicio`;
  }
}
