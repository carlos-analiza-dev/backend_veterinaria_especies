import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from './entities/pai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
  ) {}
  async create(createPaiDto: CreatePaiDto) {
    try {
      const {
        nombre,
        code,
        code_phone,
        nombre_documento,
        nombre_moneda,
        simbolo_moneda,
      } = createPaiDto;

      const pais = this.paisRepo.create({
        nombre,
        code,
        code_phone,
        nombre_documento,
        nombre_moneda,
        simbolo_moneda,
      });
      await this.paisRepo.save(pais);
      return 'Pais Creado Exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const paises = await this.paisRepo.find({});
      if (!paises || paises.length === 0)
        throw new NotFoundException(
          'No se encontraron paises en estos momentos.',
        );

      return paises;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const pais = await this.paisRepo.findOne({ where: { id } });
      if (!pais) {
        throw new NotFoundException('No se encontro el pais seleccionado');
      }
      return pais;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatePaiDto: UpdatePaiDto) {
    const pais = await this.paisRepo.findOne({ where: { id } });

    if (!pais) {
      throw new NotFoundException(`No se encontró el país con ID: ${id}`);
    }

    const updatedPais = this.paisRepo.merge(pais, updatePaiDto);
    await this.paisRepo.save(updatedPais);

    return {
      message: 'País actualizado correctamente',
      pais: updatedPais,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }
}
