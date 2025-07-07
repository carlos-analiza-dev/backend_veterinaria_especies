import { User } from 'src/auth/entities/auth.entity';
import { Cita } from 'src/citas/entities/cita.entity';
import { HorariosMedico } from 'src/horarios_medicos/entities/horarios_medico.entity';
import { SubServicio } from 'src/sub_servicios/entities/sub_servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @ManyToMany(() => SubServicio, (servicio) => servicio.medicos, {
    eager: true,
  })
  @JoinTable()
  areas_trabajo: SubServicio[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => HorariosMedico, (horario) => horario.medico, { eager: true })
  horarios: HorariosMedico[];

  @OneToMany(() => Cita, (cita) => cita.medico)
  citas: Cita[];
}
