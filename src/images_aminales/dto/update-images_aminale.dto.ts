import { PartialType } from '@nestjs/mapped-types';
import { CreateImagesAminaleDto } from './create-images_aminale.dto';

export class UpdateImagesAminaleDto extends PartialType(CreateImagesAminaleDto) {}
