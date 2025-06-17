import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('raza_animal')
export class RazaAnimal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  abreviatura: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => AnimalFinca, (animal) => animal.raza)
  animales: AnimalFinca[];

  @ManyToOne(() => EspecieAnimal, (especie) => especie.razas)
  especie: EspecieAnimal;
}
