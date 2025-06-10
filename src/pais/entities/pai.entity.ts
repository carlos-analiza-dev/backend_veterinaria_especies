import { User } from 'src/auth/entities/auth.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { ServiciosPai } from 'src/servicios_pais/entities/servicios_pai.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pais')
export class Pai {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text' })
  code_phone: string;

  @Column({ type: 'text' })
  nombre_moneda: string;

  @Column({ type: 'text' })
  simbolo_moneda: string;

  @Column({ type: 'text' })
  nombre_documento: string;

  @OneToMany(() => User, (usuario) => usuario.pais)
  usuario: User[];

  @OneToMany(() => ServiciosPai, (precio) => precio.pais)
  preciosServicios: ServiciosPai[];

  @OneToMany(() => DepartamentosPai, (departamento) => departamento.pais, {
    eager: true,
  })
  departamentos: DepartamentosPai[];

  @OneToMany(() => FincasGanadero, (fincas) => fincas.propietario)
  fincas: FincasGanadero[];

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
