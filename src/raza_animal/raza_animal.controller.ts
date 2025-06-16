import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RazaAnimalService } from './raza_animal.service';
import { CreateRazaAnimalDto } from './dto/create-raza_animal.dto';
import { UpdateRazaAnimalDto } from './dto/update-raza_animal.dto';

@Controller('raza-animal')
export class RazaAnimalController {
  constructor(private readonly razaAnimalService: RazaAnimalService) {}

  @Post()
  create(@Body() createRazaAnimalDto: CreateRazaAnimalDto) {
    return this.razaAnimalService.create(createRazaAnimalDto);
  }

  @Get('/especie/:id')
  findAll(@Param('id') id: string) {
    return this.razaAnimalService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.razaAnimalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRazaAnimalDto: UpdateRazaAnimalDto,
  ) {
    return this.razaAnimalService.update(+id, updateRazaAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.razaAnimalService.remove(+id);
  }
}
