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
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.serviciosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }
}
