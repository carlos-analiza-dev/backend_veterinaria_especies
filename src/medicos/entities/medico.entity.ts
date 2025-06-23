import { User } from 'src/auth/entities/auth.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 25 })
  numero_colegiado: string;

  @Column('varchar', { length: 25 })
  especialidad: string;

  @Column('varchar', { length: 100 })
  universidad_formacion: string;

  @Column('int', { default: 0 })
  anios_experiencia: number;

  @ManyToMany(() => Servicio, (servicio) => servicio.medicos, { eager: true })
  @JoinTable()
  areas_trabajo: Servicio[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
