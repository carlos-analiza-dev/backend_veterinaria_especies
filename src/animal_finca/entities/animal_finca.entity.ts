import { User } from 'src/auth/entities/auth.entity';
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { ImagesAminale } from 'src/images_aminales/entities/images_aminale.entity';
import { RazaAnimal } from 'src/raza_animal/entities/raza_animal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TipoReproduccionEnum {
  NATURAL = 'Monta natural',
  IATF = 'Inseminación aritificial a tiempo fijo (IATF)',
  FIV = 'Fecundación in vitro (FIV)',
}

export enum PurezaEnum {
  UNO = '1 raza',
  SIETE_OCTAVOSA = '7/8 raza',
  TRES_CUARTOS = '3/4 raza',
  CINCO_OCTAVOS = '5/8 raza',
  MEDIA_RAZA = '1/2 raza',
}

@Entity('animal_finca')
export class AnimalFinca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EspecieAnimal, { eager: true })
  especie: EspecieAnimal;

  @Column({ type: 'varchar', length: 100 })
  sexo: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  identificador: string;

  @Column({
    type: 'enum',
    enum: TipoReproduccionEnum,
    default: TipoReproduccionEnum.NATURAL,
  })
  tipo_reproduccion: TipoReproduccionEnum;

  @Column({
    type: 'enum',
    enum: PurezaEnum,
    default: PurezaEnum.UNO,
  })
  pureza: PurezaEnum;

  @ManyToMany(() => RazaAnimal, { eager: true })
  @JoinTable()
  razas: RazaAnimal[];

  @Column({ type: 'int', nullable: true })
  edad_promedio: number;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'jsonb', nullable: true })
  tipo_alimentacion: {
    alimento: string;
    origen: 'comprado' | 'producido' | 'comprado y producido';
    porcentaje_comprado?: number;
    porcentaje_producido?: number;
  }[];

  @Column({ type: 'jsonb', nullable: true })
  complementos: { complemento: string }[];

  @Column({ type: 'varchar', length: 100, default: 'Sin medicamento' })
  medicamento: string;

  /* DATOS PADRE */

  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_padre?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  arete_padre: string;

  @ManyToMany(() => RazaAnimal, { cascade: true, eager: true })
  @JoinTable({
    name: 'animal_finca_razas_padre',
  })
  razas_padre: RazaAnimal[];

  @Column({
    type: 'enum',
    enum: PurezaEnum,
    default: PurezaEnum.UNO,
  })
  pureza_padre: PurezaEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_criador_padre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_propietario_padre: string;

  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_finca_origen_padre: string;

  @Column({ type: 'boolean', default: false })
  compra_padre: boolean;

  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_criador_origen_padre: string;

  /* DATOS MADRE */
  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_madre?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  arete_madre: string;

  @ManyToMany(() => RazaAnimal, { cascade: true, eager: true })
  @JoinTable({
    name: 'animal_finca_razas_madre',
  })
  razas_madre: RazaAnimal[];

  @Column({
    type: 'enum',
    enum: PurezaEnum,
    default: PurezaEnum.UNO,
  })
  pureza_madre: PurezaEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_criador_madre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_propietario_madre: string;

  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_finca_origen_madre: string;

  @Column({ type: 'int', default: 1 })
  numero_parto_madre: number;

  @Column({ type: 'boolean', default: false })
  compra_madre: boolean;

  @Column({ type: 'varchar', length: 100, default: 'N/D' })
  nombre_criador_origen_madre: string;

  @CreateDateColumn()
  fecha_registro: Date;

  @ManyToOne(() => User, (usuario) => usuario.animales, { eager: true })
  propietario: User;

  @ManyToOne(() => FincasGanadero, (finca) => finca.animales, {
    onDelete: 'CASCADE',
    eager: true,
  })
  finca: FincasGanadero;

  @Column({ type: 'boolean', default: false })
  castrado: boolean;

  @Column({ type: 'boolean', default: false })
  esterelizado: boolean;

  @OneToMany(() => ImagesAminale, (profileImage) => profileImage.animal, {
    eager: true,
  })
  profileImages: ImagesAminale[];

  get currentProfileImage(): ImagesAminale | null {
    if (!this.profileImages || this.profileImages.length === 0) return null;

    return this.profileImages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];
  }
}
