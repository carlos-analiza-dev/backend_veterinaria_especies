import { User } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('insumos_capex')
export class InsumosUsuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  cantidadSku: number;

  @Column({ type: 'text', array: true })
  categorias: string[];

  @Column({ type: 'text' })
  materiaPrima: string;

  @Column({ type: 'text' })
  intereses: string;

  @ManyToOne(() => User, (user) => user.insumosCapex, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
