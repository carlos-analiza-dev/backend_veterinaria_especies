import { User } from 'src/auth/entities/auth.entity';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departamentos_pais')
export class DepartamentosPai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Pai, (pais) => pais.departamentos, { onDelete: 'CASCADE' })
  pais: Pai;

  @OneToMany(
    () => MunicipiosDepartamentosPai,
    (municipio) => municipio.departamento,
    { cascade: true, eager: true },
  )
  municipios: MunicipiosDepartamentosPai[];

  @OneToMany(() => User, (usuario) => usuario.departamento)
  usuarios: User[];
}
