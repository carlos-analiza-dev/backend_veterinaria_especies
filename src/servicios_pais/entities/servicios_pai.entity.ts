import { Pai } from 'src/pais/entities/pai.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicios_pais')
export class ServiciosPai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Servicio, (servicio) => servicio.preciosPorPais)
  servicio: Servicio;

  @ManyToOne(() => Pai, (pais) => pais.preciosServicios, { eager: true })
  pais: Pai;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', nullable: true })
  cantidadMin?: number;

  @Column({ type: 'int', nullable: true })
  cantidadMax?: number;

  @Column({ type: 'int', nullable: true })
  tiempo?: number;
}
