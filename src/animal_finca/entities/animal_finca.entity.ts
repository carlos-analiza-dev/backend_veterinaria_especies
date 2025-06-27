import { User } from 'src/auth/entities/auth.entity';
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { RazaAnimal } from 'src/raza_animal/entities/raza_animal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('animal_finca')
export class AnimalFinca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EspecieAnimal, { eager: true })
  especie: EspecieAnimal;

  @Column({ type: 'varchar', length: 100 })
  sexo: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  identificador: string;

  @ManyToOne(() => RazaAnimal, (raza) => raza.animales, { eager: true })
  raza: RazaAnimal;

  @Column({ type: 'int', nullable: true })
  edad_promedio: number;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'jsonb', nullable: true })
  tipo_alimentacion: { alimento: string }[];

  @CreateDateColumn()
  fecha_registro: Date;

  @ManyToOne(() => User, (usuario) => usuario.animales, { eager: true })
  propietario: User;

  @ManyToOne(() => FincasGanadero, (finca) => finca.animales, {
    onDelete: 'CASCADE',
    eager: true,
  })
  finca: FincasGanadero;

  @Column({ type: 'boolean', default: false })
  castrado: boolean;

  @Column({ type: 'boolean', default: false })
  esterelizado: boolean;
}
