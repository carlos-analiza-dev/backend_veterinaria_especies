import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInsumosUsuarioDto } from './dto/create-insumos_usuario.dto';
import { UpdateInsumosUsuarioDto } from './dto/update-insumos_usuario.dto';
import { InsumosUsuario } from './entities/insumos_usuario.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class InsumosUsuarioService {
  constructor(
    @InjectRepository(InsumosUsuario)
    private readonly insumosRepository: Repository<InsumosUsuario>,
  ) {}

  async create(createDto: CreateInsumosUsuarioDto) {
    const insumo = this.insumosRepository.create(createDto);
    return await this.insumosRepository.save(insumo);
  }

  async findAll(user: User) {
    try {
      const userId = user.id;

      if (!userId) {
        throw new NotFoundException('No se encontró el usuario');
      }

      const insumos = await this.insumosRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!insumos || insumos.length === 0) {
        throw new NotFoundException(
          'No se encontraron insumos en este momento',
        );
      }

      return insumos;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const insumo = await this.insumosRepository.findOne({ where: { id } });
    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }
    return insumo;
  }

  async update(id: string, updateDto: UpdateInsumosUsuarioDto) {
    const insumo = await this.insumosRepository.preload({
      id,
      ...updateDto,
    });
    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }
    return this.insumosRepository.save(insumo);
  }

  async remove(id: string) {
    const insumo = await this.findOne(id);
    return await this.insumosRepository.remove(insumo);
  }
}
