import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumosUsuarioDto } from './create-insumos_usuario.dto';

export class UpdateInsumosUsuarioDto extends PartialType(CreateInsumosUsuarioDto) {}
