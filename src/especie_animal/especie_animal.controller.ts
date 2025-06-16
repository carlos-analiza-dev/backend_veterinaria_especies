import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecieAnimalService } from './especie_animal.service';
import { CreateEspecieAnimalDto } from './dto/create-especie_animal.dto';
import { UpdateEspecieAnimalDto } from './dto/update-especie_animal.dto';

@Controller('especie-animal')
export class EspecieAnimalController {
  constructor(private readonly especieAnimalService: EspecieAnimalService) {}

  @Post()
  create(@Body() createEspecieAnimalDto: CreateEspecieAnimalDto) {
    return this.especieAnimalService.create(createEspecieAnimalDto);
  }

  @Get()
  findAll() {
    return this.especieAnimalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especieAnimalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecieAnimalDto: UpdateEspecieAnimalDto) {
    return this.especieAnimalService.update(+id, updateEspecieAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especieAnimalService.remove(+id);
  }
}
