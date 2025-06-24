import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { Medico } from 'src/medicos/entities/medico.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medico, (medico) => medico.citas)
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @ManyToOne(() => AnimalFinca)
  @JoinColumn({ name: 'animalId' })
  animal: AnimalFinca;

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;

  @Column({ type: 'int' })
  cantidadAnimales: number;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;
}
