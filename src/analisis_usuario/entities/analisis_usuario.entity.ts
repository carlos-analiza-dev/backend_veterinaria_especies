import { User } from 'src/auth/entities/auth.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('analisis_eficiencia')
export class AnalisisEficiencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', comment: 'Fecha del análisis de suelo' })
  fechaAnalisis: Date;

  @Column({
    type: 'enum',
    enum: ['Excelente', 'Buena', 'Regular', 'Mala', 'Pésima'],
    comment: 'Calidad general del suelo',
  })
  calidadSuelo: string;

  @Column({
    type: 'enum',
    enum: ['Arcilloso', 'Franco', 'Arenoso', 'Limoso', 'Orgánico'],
    comment: 'Tipo de suelo analizado',
  })
  tipoSuelo: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Rendimiento en kg/ha o ton/ha según el cultivo',
  })
  rendimiento: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Eficiencia de insumos vs producción (porcentaje)',
  })
  eficienciaInsumos: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    comment: 'pH del suelo',
  })
  phSuelo?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: 'Materia orgánica (%)',
  })
  materiaOrganica?: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Observaciones adicionales del análisis',
  })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.analisisEficiencia)
  user: User;

  calcularEficiencia(produccion: number, insumosUtilizados: number): void {
    if (insumosUtilizados > 0) {
      this.eficienciaInsumos = parseFloat(
        ((produccion / insumosUtilizados) * 100).toFixed(2),
      );
    }
  }
}
