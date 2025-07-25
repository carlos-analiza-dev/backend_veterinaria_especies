import { ProduccionFinca } from 'src/produccion_finca/entities/produccion_finca.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('produccion_ganadera')
export class ProduccionGanadera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  leche_diaria_lt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  carne_anual_kg: number;

  @Column({ type: 'int', nullable: true })
  animales_vendidos: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notas: string;

  @OneToOne(() => ProduccionFinca, (produccion) => produccion.ganadera)
  @JoinColumn({ name: 'produccionFincaId' })
  produccionFinca: ProduccionFinca;
}
