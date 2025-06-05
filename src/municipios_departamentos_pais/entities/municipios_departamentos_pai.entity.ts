import { User } from 'src/auth/entities/auth.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('municipios_departamento')
export class MunicipiosDepartamentosPai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(
    () => DepartamentosPai,
    (departamento) => departamento.municipios,
    { onDelete: 'CASCADE' },
  )
  departamento: DepartamentosPai;

  @OneToMany(() => User, (usuario) => usuario.municipio)
  usuarios: User[];
}
