import { User } from 'src/auth/entities/auth.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
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

  @Column({ type: 'varchar', length: 100 })
  especie: string;

  @Column({ type: 'varchar', length: 100 })
  sexo: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  identificador: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  raza: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  edad_promedio: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  fecha_registro: Date;

  @ManyToOne(() => User, (usuario) => usuario.animales, { eager: true })
  propietario: User;

  @ManyToOne(() => FincasGanadero, (finca) => finca.animales, {
    onDelete: 'CASCADE',
  })
  finca: FincasGanadero;
}
