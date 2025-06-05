import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MunicipiosDepartamentosPaisService } from './municipios_departamentos_pais.service';
import { CreateMunicipiosDepartamentosPaiDto } from './dto/create-municipios_departamentos_pai.dto';
import { UpdateMunicipiosDepartamentosPaiDto } from './dto/update-municipios_departamentos_pai.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('municipios-departamentos-pais')
export class MunicipiosDepartamentosPaisController {
  constructor(
    private readonly municipiosDepartamentosPaisService: MunicipiosDepartamentosPaisService,
  ) {}

  @Post()
  create(
    @Body()
    createMunicipiosDepartamentosPaiDto: CreateMunicipiosDepartamentosPaiDto,
  ) {
    return this.municipiosDepartamentosPaisService.create(
      createMunicipiosDepartamentosPaiDto,
    );
  }

  @Get('/municipios/:departamentoId')
  findAll(
    @Param('departamentoId') departamentoId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.municipiosDepartamentosPaisService.findAll(
      departamentoId,
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipiosDepartamentosPaisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateMunicipiosDepartamentosPaiDto: UpdateMunicipiosDepartamentosPaiDto,
  ) {
    return this.municipiosDepartamentosPaisService.update(
      id,
      updateMunicipiosDepartamentosPaiDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipiosDepartamentosPaisService.remove(+id);
  }
}
