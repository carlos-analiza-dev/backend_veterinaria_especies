import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorariosTrabajoService } from './horarios_trabajo.service';
import { CreateHorariosTrabajoDto } from './dto/create-horarios_trabajo.dto';
import { UpdateHorariosTrabajoDto } from './dto/update-horarios_trabajo.dto';

@Controller('horarios-trabajo')
export class HorariosTrabajoController {
  constructor(private readonly horariosTrabajoService: HorariosTrabajoService) {}

  @Post()
  create(@Body() createHorariosTrabajoDto: CreateHorariosTrabajoDto) {
    return this.horariosTrabajoService.create(createHorariosTrabajoDto);
  }

  @Get()
  findAll() {
    return this.horariosTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horariosTrabajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorariosTrabajoDto: UpdateHorariosTrabajoDto) {
    return this.horariosTrabajoService.update(+id, updateHorariosTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horariosTrabajoService.remove(+id);
  }
}
