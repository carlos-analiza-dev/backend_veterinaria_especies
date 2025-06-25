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
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.medicosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicosService.findOne(id);
  }

  @Get('especialidad/:id')
  findByEspecialidades(@Param('id') id: string) {
    return this.medicosService.findByEspecialidades(id);
  }

  @Get('especialidad/:paisId/:id')
  findByEspecialidadesByPais(
    @Param('paisId') paisId: string,
    @Param('id') id: string,
  ) {
    return this.medicosService.findByEspecialidadesByPais(paisId, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(+id);
  }
}
