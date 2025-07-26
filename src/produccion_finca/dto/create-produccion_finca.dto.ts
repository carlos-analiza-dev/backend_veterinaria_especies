import { IsBoolean, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProduccionAgricolaDto } from 'src/produccion_agricola/dto/create-produccion_agricola.dto';
import { CreateProduccionForrajesInsumoDto } from 'src/produccion_forrajes_insumos/dto/create-produccion_forrajes_insumo.dto';
import { CreateProduccionAlternativaDto } from 'src/produccion_alternativa/dto/create-produccion_alternativa.dto';
import { CreateProduccionApiculturaDto } from 'src/produccion_apicultura/dto/create-produccion_apicultura.dto';
import { ProduccionGanaderaDto } from 'src/produccion_ganadera/dto/create-produccion_ganadera.dto';

export class CreateProduccionFincaDto {
  @IsUUID()
  fincaId: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProduccionGanaderaDto)
  ganadera?: ProduccionGanaderaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProduccionAgricolaDto)
  agricola?: CreateProduccionAgricolaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProduccionApiculturaDto)
  apicultura?: CreateProduccionApiculturaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProduccionForrajesInsumoDto)
  forrajesInsumo?: CreateProduccionForrajesInsumoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProduccionAlternativaDto)
  alternativa?: CreateProduccionAlternativaDto;

  @IsBoolean()
  @IsOptional()
  produccion_mixta?: boolean = false;

  @IsBoolean()
  @IsOptional()
  transformacion_artesanal?: boolean = false;

  @IsBoolean()
  @IsOptional()
  consumo_propio?: boolean = false;

  @IsBoolean()
  @IsOptional()
  produccion_venta?: boolean = false;
}
