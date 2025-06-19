import { Servicio } from 'src/servicios/entities/servicio.entity';
import { ServiciosPai } from 'src/servicios_pais/entities/servicios_pai.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity('sub_servicios')
export class SubServicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ name: 'servicio_id' })
  servicioId: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @ManyToOne(() => Servicio, (servicio) => servicio.subServicios)
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;

  @OneToMany(() => ServiciosPai, (precio) => precio.subServicio, {
    eager: true,
    cascade: true,
  })
  preciosPorPais: ServiciosPai[];
}
