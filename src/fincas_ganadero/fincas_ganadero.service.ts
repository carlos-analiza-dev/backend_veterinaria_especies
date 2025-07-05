import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFincasGanaderoDto } from './dto/create-fincas_ganadero.dto';
import { UpdateFincasGanaderoDto } from './dto/update-fincas_ganadero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FincasGanadero } from './entities/fincas_ganadero.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class FincasGanaderoService {
  constructor(
    @InjectRepository(FincasGanadero)
    private readonly fincasRepo: Repository<FincasGanadero>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
    @InjectRepository(DepartamentosPai)
    private readonly deptoRepo: Repository<DepartamentosPai>,
    @InjectRepository(MunicipiosDepartamentosPai)
    private readonly municipioRepo: Repository<MunicipiosDepartamentosPai>,
  ) {}
  async create(createFincasGanaderoDto: CreateFincasGanaderoDto) {
    const {
      nombre_finca,
      cantidad_animales,
      abreviatura,
      area_ganaderia_hectarea,
      tamaño_total_hectarea,
      tipo_explotacion,
      ubicacion,
      especies_maneja,
      propietario_id,
      departamentoId,
      municipioId,
      pais_id,
      latitud,
      longitud,
    } = createFincasGanaderoDto;

    try {
      const propietario = await this.userRepo.findOneBy({ id: propietario_id });
      if (!propietario) {
        throw new NotFoundException('El propietario no existe');
      }

      const departamento = await this.deptoRepo.findOneBy({
        id: departamentoId,
      });
      if (!departamento) {
        throw new NotFoundException('El departamento no existe');
      }

      const municipio = await this.municipioRepo.findOneBy({ id: municipioId });
      if (!municipio) {
        throw new NotFoundException('El municipio no existe');
      }

      const pais = await this.paisRepo.findOneBy({ id: pais_id });
      if (!pais) {
        throw new NotFoundException('El pais no existe');
      }

      const finca = this.fincasRepo.create({
        nombre_finca,
        cantidad_animales,
        abreviatura,
        area_ganaderia_hectarea,
        tamaño_total_hectarea,
        tipo_explotacion,
        especies_maneja,
        ubicacion,
        propietario: propietario,
        pais_id: pais,
        departamento,
        municipio,
        latitud,
        longitud,
      });

      await this.fincasRepo.save(finca);

      return {
        message: 'Finca creada exitosamente',
        data: finca,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(propietarioId: string, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, name } = paginationDto;
    try {
      const propietario = await this.userRepo.findOneBy({ id: propietarioId });
      if (!propietario) {
        throw new NotFoundException('El propietario no existe');
      }

      const query = this.fincasRepo
        .createQueryBuilder('finca')
        .leftJoinAndSelect('finca.departamento', 'departamento')
        .leftJoinAndSelect('finca.municipio', 'municipio')
        .leftJoinAndSelect('finca.propietario', 'propietario')
        .where('finca.propietarioId = :propietarioId', { propietarioId })
        .andWhere('finca.isActive = true');

      if (name) {
        query.andWhere('LOWER(finca.nombre_finca) LIKE LOWER(:name)', {
          name: `%${name}%`,
        });
      }

      query.orderBy('finca.fecha_registro', 'DESC').skip(offset).take(limit);

      const [fincas, total] = await query.getManyAndCount();
      const fincasPlain = instanceToPlain(fincas);

      return {
        fincas: fincasPlain,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const finca = await this.fincasRepo.findOne({ where: { id } });
      if (!finca)
        throw new NotFoundException('No se encontro la finca seleccionada');
      return finca;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateFincasGanaderoDto: UpdateFincasGanaderoDto) {
    const {
      nombre_finca,
      cantidad_animales,
      abreviatura,
      area_ganaderia_hectarea,
      tamaño_total_hectarea,
      tipo_explotacion,
      ubicacion,
      especies_maneja,
      propietario_id,
      departamentoId,
      municipioId,
      pais_id,
    } = updateFincasGanaderoDto;

    try {
      const finca = await this.fincasRepo.findOne({
        where: { id },
        relations: ['propietario', 'departamento', 'municipio', 'pais_id'],
      });

      if (!finca) {
        throw new NotFoundException('No se encontró la finca a actualizar');
      }

      if (propietario_id) {
        const propietario = await this.userRepo.findOneBy({
          id: propietario_id,
        });
        if (!propietario) {
          throw new NotFoundException('El propietario no existe');
        }
        finca.propietario = propietario;
      }

      if (departamentoId) {
        const departamento = await this.deptoRepo.findOneBy({
          id: departamentoId,
        });
        if (!departamento) {
          throw new NotFoundException('El departamento no existe');
        }
        finca.departamento = departamento;
      }

      if (municipioId) {
        const municipio = await this.municipioRepo.findOneBy({
          id: municipioId,
        });
        if (!municipio) {
          throw new NotFoundException('El municipio no existe');
        }
        finca.municipio = municipio;
      }

      if (pais_id) {
        const pais = await this.paisRepo.findOneBy({ id: pais_id });
        if (!pais) {
          throw new NotFoundException('El país no existe');
        }
        finca.pais_id = pais;
      }

      finca.nombre_finca = nombre_finca ?? finca.nombre_finca;
      finca.cantidad_animales = cantidad_animales ?? finca.cantidad_animales;
      finca.abreviatura = abreviatura ?? finca.abreviatura;
      finca.area_ganaderia_hectarea =
        area_ganaderia_hectarea ?? finca.area_ganaderia_hectarea;
      finca.tamaño_total_hectarea =
        tamaño_total_hectarea ?? finca.tamaño_total_hectarea;
      finca.tipo_explotacion = tipo_explotacion ?? finca.tipo_explotacion;
      finca.ubicacion = ubicacion ?? finca.ubicacion;
      finca.especies_maneja = especies_maneja ?? finca.especies_maneja;

      await this.fincasRepo.save(finca);

      return {
        message: 'Finca actualizada exitosamente',
        data: finca,
      };
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} fincasGanadero`;
  }
}
