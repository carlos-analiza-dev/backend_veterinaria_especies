import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { RazaAnimal } from 'src/raza_animal/entities/raza_animal.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('especie_animal')
export class EspecieAnimal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => AnimalFinca, (animal) => animal.especie)
  animales: AnimalFinca[];

  @OneToMany(() => RazaAnimal, (raza) => raza.especie)
  razas: RazaAnimal[];
}
