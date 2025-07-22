import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalisisUsuarioService } from './analisis_usuario.service';
import { CreateAnalisisUsuarioDto } from './dto/create-analisis_usuario.dto';
import { UpdateAnalisisUsuarioDto } from './dto/update-analisis_usuario.dto';

@Controller('analisis-usuario')
export class AnalisisUsuarioController {
  constructor(private readonly analisisUsuarioService: AnalisisUsuarioService) {}

  @Post()
  create(@Body() createAnalisisUsuarioDto: CreateAnalisisUsuarioDto) {
    return this.analisisUsuarioService.create(createAnalisisUsuarioDto);
  }

  @Get()
  findAll() {
    return this.analisisUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analisisUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalisisUsuarioDto: UpdateAnalisisUsuarioDto) {
    return this.analisisUsuarioService.update(+id, updateAnalisisUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analisisUsuarioService.remove(+id);
  }
}
