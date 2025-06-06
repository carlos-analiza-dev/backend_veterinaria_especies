import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiciosPaiDto } from './dto/create-servicios_pai.dto';
import { UpdateServiciosPaiDto } from './dto/update-servicios_pai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiciosPai } from './entities/servicios_pai.entity';
import { Repository } from 'typeorm';
import { Pai } from 'src/pais/entities/pai.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Injectable()
export class ServiciosPaisService {
  constructor(
    @InjectRepository(ServiciosPai)
    private readonly servicio_percios_Repo: Repository<ServiciosPai>,
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}
  async create(createServiciosPaiDto: CreateServiciosPaiDto) {
    const { servicioId, paisId, precio, cantidadMin, cantidadMax, tiempo } =
      createServiciosPaiDto;
    try {
      const pais_exist = await this.paisRepo.findOne({ where: { id: paisId } });
      if (!pais_exist)
        throw new NotFoundException(
          'El pais seleccionado no se encuentra en la base de datos.',
        );

      const servicio_exist = await this.servicioRepo.findOne({
        where: { id: servicioId },
      });
      if (!servicio_exist)
        throw new NotFoundException(
          'El servicio seleccionado no se encuentra en la base de datos.',
        );

      const servicio = this.servicio_percios_Repo.create({
        pais: pais_exist,
        servicio: servicio_exist,
        precio,
        cantidadMin,
        cantidadMax,
        tiempo,
      });
      await this.servicio_percios_Repo.save(servicio);
      return 'Servicio creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(servicioId: string, paginationDto: PaginationDto) {
    try {
      const servicio = await this.servicioRepo.findOne({
        where: { id: servicioId },
      });
      if (!servicio)
        throw new NotFoundException('No se encontro el servicio seleccionado.');

      const servicios_pais_detalle = await this.servicio_percios_Repo.find({
        where: { servicio: servicio },
      });
      return servicios_pais_detalle;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} serviciosPai`;
  }

  async update(id: string, updateServiciosPaiDto: UpdateServiciosPaiDto) {
    const servicio = await this.servicio_percios_Repo.findOne({
      where: { id },
      relations: ['pais', 'servicio'],
    });

    if (!servicio) {
      throw new NotFoundException(`No se encontró el servicio con id ${id}`);
    }

    const { paisId, precio, cantidadMin, cantidadMax, tiempo } =
      updateServiciosPaiDto;

    if (paisId) {
      const pais_exist = await this.paisRepo.findOne({ where: { id: paisId } });
      if (!pais_exist) {
        throw new NotFoundException(`El país con id ${paisId} no existe.`);
      }
      servicio.pais = pais_exist;
    }

    if (precio !== undefined) servicio.precio = precio;
    if (cantidadMin !== undefined) servicio.cantidadMin = cantidadMin;
    if (cantidadMax !== undefined) servicio.cantidadMax = cantidadMax;
    if (tiempo !== undefined) servicio.tiempo = tiempo;

    await this.servicio_percios_Repo.save(servicio);

    return { message: 'Servicio actualizado exitosamente' };
  }

  remove(id: number) {
    return `This action removes a #${id} serviciosPai`;
  }
}
