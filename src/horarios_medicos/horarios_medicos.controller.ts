import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HorariosMedicosService } from './horarios_medicos.service';
import { CreateHorariosMedicoDto } from './dto/create-horarios_medico.dto';
import { UpdateHorariosMedicoDto } from './dto/update-horarios_medico.dto';

@Controller('horarios-medicos')
export class HorariosMedicosController {
  constructor(
    private readonly horariosMedicosService: HorariosMedicosService,
  ) {}

  @Post()
  create(@Body() createHorariosMedicoDto: CreateHorariosMedicoDto) {
    return this.horariosMedicosService.create(createHorariosMedicoDto);
  }

  @Get()
  findAll() {
    return this.horariosMedicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horariosMedicosService.findOne(id);
  }

  @Get('medico/:medicoId')
  async getHorariosByMedico(@Param('medicoId') medicoId: string) {
    return this.horariosMedicosService.findByMedicoId(medicoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHorariosMedicoDto: UpdateHorariosMedicoDto,
  ) {
    return this.horariosMedicosService.update(id, updateHorariosMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horariosMedicosService.remove(id);
  }
}
