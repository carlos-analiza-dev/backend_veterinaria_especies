import { ProduccionFinca } from 'src/produccion_finca/entities/produccion_finca.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('produccion_alternativa')
export class ProduccionAlternativa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment:
      'Puede contener: Hongos comestibles, Abonos orgánicos, Semillas, Plantas medicinales/aromáticas, Otros',
  })
  actividades: Array<{
    tipo:
      | 'Hongos comestibles'
      | 'Abonos orgánicos'
      | 'Semillas'
      | 'Plantas medicinales o aromáticas'
      | 'Otros';
    descripcion?: string;
    cantidad_producida?: string;
    unidad_medida?: string;
    ingresos_anuales?: number;
  }>;

  @OneToOne(() => ProduccionFinca, (produccion) => produccion.alternativa)
  produccionFinca: ProduccionFinca;
}
