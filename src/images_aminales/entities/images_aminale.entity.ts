import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('images_animales')
export class ImagesAminale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  key: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @ManyToOne(() => AnimalFinca, (animal) => animal.profileImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: AnimalFinca;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
