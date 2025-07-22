import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalisisUsuarioDto } from './create-analisis_usuario.dto';

export class UpdateAnalisisUsuarioDto extends PartialType(CreateAnalisisUsuarioDto) {}
