import { Medico } from 'src/medicos/entities/medico.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('horarios_medicos')
export class HorariosMedico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medico, (medico) => medico.horarios)
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @Column({ type: 'int' })
  diaSemana: number;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;
}
