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
import { AnalisisUsuarioService } from './analisis_usuario.service';
import { CreateAnalisisUsuarioDto } from './dto/create-analisis_usuario.dto';
import { UpdateAnalisisUsuarioDto } from './dto/update-analisis_usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('analisis-usuario')
export class AnalisisUsuarioController {
  constructor(
    private readonly analisisUsuarioService: AnalisisUsuarioService,
  ) {}

  @Post()
  create(@Body() createAnalisisUsuarioDto: CreateAnalisisUsuarioDto) {
    return this.analisisUsuarioService.create(createAnalisisUsuarioDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.analisisUsuarioService.findAll(paginationDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analisisUsuarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalisisUsuarioDto: UpdateAnalisisUsuarioDto,
  ) {
    return this.analisisUsuarioService.update(id, updateAnalisisUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analisisUsuarioService.remove(id);
  }
}
