import { ServiciosPai } from 'src/servicios_pais/entities/servicios_pai.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @OneToMany(() => ServiciosPai, (precio) => precio.servicio, { eager: true })
  preciosPorPais: ServiciosPai[];
}
