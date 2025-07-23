import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInsumosUsuarioDto } from './dto/create-insumos_usuario.dto';
import { UpdateInsumosUsuarioDto } from './dto/update-insumos_usuario.dto';
import { InsumosUsuario } from './entities/insumos_usuario.entity';
import { User } from 'src/auth/entities/auth.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Injectable()
export class InsumosUsuarioService {
  constructor(
    @InjectRepository(InsumosUsuario)
    private readonly insumosRepository: Repository<InsumosUsuario>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createDto: CreateInsumosUsuarioDto) {
    const { userId } = createDto;
    try {
      const usuario_existe = await this.userRepo.findOne({
        where: { id: userId },
      });
      if (!usuario_existe)
        throw new BadRequestException(
          'No se encontro el usuario en este momento',
        );
      const insumo = this.insumosRepository.create({
        user: usuario_existe,
        ...createDto,
      });
      await this.insumosRepository.save(insumo);
      return 'Insumo Creado Exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const userId = user.id;

      if (!userId) {
        throw new NotFoundException('No se encontró el usuario');
      }

      const [insumos, total] = await this.insumosRepository.findAndCount({
        where: { user: { id: userId } },
        relations: ['user'],
        take: limit,
        skip: offset,
        order: { createdAt: 'DESC' },
      });

      if (!insumos || insumos.length === 0) {
        throw new NotFoundException('No se encontraron insumos');
      }

      return {
        data: instanceToPlain(insumos),

        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const insumo = await this.insumosRepository.findOne({ where: { id } });
    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }
    return instanceToPlain(insumo);
  }

  async update(id: string, updateDto: UpdateInsumosUsuarioDto) {
    try {
      const { userId, ...insumoData } = updateDto;

      if (userId) {
        const userExist = await this.userRepo.findOne({
          where: { id: userId },
          select: ['id'],
        });

        if (!userExist) {
          throw new NotFoundException('Usuario no encontrado');
        }
      }

      const existingInsumo = await this.insumosRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!existingInsumo) {
        throw new NotFoundException(`Insumo con ID ${id} no encontrado`);
      }

      const updatedInsumo = this.insumosRepository.merge(
        existingInsumo,
        insumoData,
        userId ? { user: { id: userId } } : {},
      );

      const savedInsumo = await this.insumosRepository.save(updatedInsumo);

      return {
        success: true,
        message: 'Insumo actualizado exitosamente',
        data: {
          ...savedInsumo,
          userId: savedInsumo.user?.id,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar el insumo. Por favor intente nuevamente.',
      );
    }
  }

  async remove(id: string) {
    const insumo = await this.insumosRepository.findOne({ where: { id } });
    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }

    await this.insumosRepository.remove(insumo);

    return {
      success: true,
      message: 'Insumo eliminado exitosamente',
      id,
    };
  }
}
