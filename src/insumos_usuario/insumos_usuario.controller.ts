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
import { InsumosUsuarioService } from './insumos_usuario.service';
import { CreateInsumosUsuarioDto } from './dto/create-insumos_usuario.dto';
import { UpdateInsumosUsuarioDto } from './dto/update-insumos_usuario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('insumos-usuario')
export class InsumosUsuarioController {
  constructor(private readonly insumosUsuarioService: InsumosUsuarioService) {}

  @Post()
  create(@Body() createInsumosUsuarioDto: CreateInsumosUsuarioDto) {
    return this.insumosUsuarioService.create(createInsumosUsuarioDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.insumosUsuarioService.findAll(paginationDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insumosUsuarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInsumosUsuarioDto: UpdateInsumosUsuarioDto,
  ) {
    return this.insumosUsuarioService.update(id, updateInsumosUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insumosUsuarioService.remove(id);
  }
}
