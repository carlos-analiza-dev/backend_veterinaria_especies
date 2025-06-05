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
import { DepartamentosPaisService } from './departamentos_pais.service';
import { CreateDepartamentosPaiDto } from './dto/create-departamentos_pai.dto';
import { UpdateDepartamentosPaiDto } from './dto/update-departamentos_pai.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('departamentos-pais')
export class DepartamentosPaisController {
  constructor(
    private readonly departamentosPaisService: DepartamentosPaisService,
  ) {}

  @Post()
  create(@Body() createDepartamentosPaiDto: CreateDepartamentosPaiDto) {
    return this.departamentosPaisService.create(createDepartamentosPaiDto);
  }

  @Get('/departamenos/:paisId')
  findAll(
    @Param('paisId') paisId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.departamentosPaisService.findAll(paisId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentosPaisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartamentosPaiDto: UpdateDepartamentosPaiDto,
  ) {
    return this.departamentosPaisService.update(id, updateDepartamentosPaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentosPaisService.remove(+id);
  }
}
