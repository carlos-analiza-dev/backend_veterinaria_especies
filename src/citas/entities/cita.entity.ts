import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { User } from 'src/auth/entities/auth.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { EstadoCita } from 'src/interfaces/estados_citas';
import { Medico } from 'src/medicos/entities/medico.entity';
import { SubServicio } from 'src/sub_servicios/entities/sub_servicio.entity';
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

  @ManyToOne(() => FincasGanadero, { eager: true })
  @JoinColumn({ name: 'fincaId' })
  finca: FincasGanadero;

  @ManyToOne(() => SubServicio)
  @JoinColumn({ name: 'subServicioId' })
  subServicio: SubServicio;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuarioId' })
  user: User;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'int', default: 1 })
  cantidadAnimales: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPagar: number;

  @Column({ type: 'int', default: 1 })
  duracion: number;

  @Column({ type: 'enum', enum: EstadoCita, default: EstadoCita.PENDIENTE })
  estado: EstadoCita;
}
