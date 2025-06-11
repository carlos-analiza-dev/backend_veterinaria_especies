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
      area_ganaderia,
      tamaño_total,
      tipo_explotacion,
      ubicacion,
      especies_maneja,
      propietario_id,
      departamentoId,
      municipioId,
      pais_id,
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
        area_ganaderia,
        tamaño_total,
        tipo_explotacion,
        especies_maneja,
        ubicacion,
        propietario: propietario,
        pais_id: pais,
        departamento,
        municipio,
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

  async findAll(propietarioId: string) {
    try {
      const propietario = await this.userRepo.findOneBy({ id: propietarioId });
      if (!propietario) {
        throw new NotFoundException('El propietario no existe');
      }

      const [fincas, total] = await this.fincasRepo.findAndCount({
        where: {
          propietario: { id: propietarioId },
          isActive: true,
        },
        relations: ['departamento', 'municipio', 'propietario'],

        order: { fecha_registro: 'DESC' },
      });

      const fincas_propietario = instanceToPlain(fincas);

      return {
        fincas: fincas_propietario,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} fincasGanadero`;
  }

  update(id: number, updateFincasGanaderoDto: UpdateFincasGanaderoDto) {
    return `This action updates a #${id} fincasGanadero`;
  }

  remove(id: number) {
    return `This action removes a #${id} fincasGanadero`;
  }
}
