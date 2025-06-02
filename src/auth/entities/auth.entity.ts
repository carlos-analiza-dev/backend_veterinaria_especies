import { Exclude } from 'class-transformer';
import { UserRole } from 'src/interfaces/user.role.interface';
import { Pai } from 'src/pais/entities/pai.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text', { select: true })
  password: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  identificacion: string;

  @Column('text')
  direccion: string;

  @Column('text', { unique: true })
  telefono: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  rol: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAuthorized: boolean;

  @ManyToOne(() => Pai, (pais) => pais.usuario, { eager: true })
  pais: Pai;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
