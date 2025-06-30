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
import { FincasGanaderoService } from './fincas_ganadero.service';
import { CreateFincasGanaderoDto } from './dto/create-fincas_ganadero.dto';
import { UpdateFincasGanaderoDto } from './dto/update-fincas_ganadero.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('fincas-ganadero')
export class FincasGanaderoController {
  constructor(private readonly fincasGanaderoService: FincasGanaderoService) {}

  @Post()
  create(@Body() createFincasGanaderoDto: CreateFincasGanaderoDto) {
    return this.fincasGanaderoService.create(createFincasGanaderoDto);
  }

  @Get('/fincas/:propietadrioId')
  findAll(
    @Param('propietadrioId') propietadrioId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.fincasGanaderoService.findAll(propietadrioId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fincasGanaderoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFincasGanaderoDto: UpdateFincasGanaderoDto,
  ) {
    return this.fincasGanaderoService.update(id, updateFincasGanaderoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fincasGanaderoService.remove(+id);
  }
}
