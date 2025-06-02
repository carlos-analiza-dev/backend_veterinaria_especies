import { User } from 'src/auth/entities/auth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pais')
export class Pai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @OneToMany(() => User, (usuario) => usuario.pais)
  usuario: User[];

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
