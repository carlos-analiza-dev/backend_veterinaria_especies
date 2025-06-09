import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pai)
    private readonly paiRepository: Repository<Pai>,
    @InjectRepository(DepartamentosPai)
    private readonly departamentoRepository: Repository<DepartamentosPai>,
    @InjectRepository(MunicipiosDepartamentosPai)
    private readonly municipioRepository: Repository<MunicipiosDepartamentosPai>,
    private readonly configService: ConfigService,
  ) {}

  async executeSeed() {
    await this.createRoles();
    const honduras = await this.createHonduras();
    const franciscoMorazan = await this.createDepartamentoFranciscoMorazan(
      honduras,
    );
    const tegucigalpa = await this.createMunicipioTegucigalpa(franciscoMorazan);
    await this.createAdminUser(honduras, franciscoMorazan, tegucigalpa);
    return { message: 'Semilla ejecutada correctamente' };
  }

  private async createRoles() {
    const rolesData = [
      { name: 'Administrador', description: 'Administrador del sistema' },
      { name: 'User', description: 'Usuario regular' },
      {
        name: 'Veterinario',
        description: 'Veterinario Laboratorios Centroamericanos',
      },
      { name: 'Secretario', description: 'Secretarios Veterinaria Analiza' },
    ];

    for (const roleData of rolesData) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleData.name },
      });

      if (!existingRole) {
        await this.roleRepository.save(this.roleRepository.create(roleData));
      }
    }
  }

  private async createHonduras(): Promise<Pai> {
    const existingPai = await this.paiRepository.findOne({
      where: { nombre: 'Honduras' },
    });

    if (!existingPai) {
      const newPai = this.paiRepository.create({
        nombre: 'Honduras',
        code: 'HN',
        code_phone: '+504',
        nombre_moneda: 'Lempira',
        simbolo_moneda: 'L',
        nombre_documento: 'DNI',
        isActive: true,
      });
      return await this.paiRepository.save(newPai);
    }
    return existingPai;
  }

  private async createDepartamentoFranciscoMorazan(
    pai: Pai,
  ): Promise<DepartamentosPai> {
    const existingDepartamento = await this.departamentoRepository.findOne({
      where: { nombre: 'Francisco Morazán', pais: { id: pai.id } },
      relations: ['pais'],
    });

    if (!existingDepartamento) {
      const newDepartamento = this.departamentoRepository.create({
        nombre: 'Francisco Morazán',
        pais: pai,
        isActive: true,
      });
      return await this.departamentoRepository.save(newDepartamento);
    }
    return existingDepartamento;
  }

  private async createMunicipioTegucigalpa(
    departamento: DepartamentosPai,
  ): Promise<MunicipiosDepartamentosPai> {
    const existingMunicipio = await this.municipioRepository.findOne({
      where: { nombre: 'Tegucigalpa', departamento: { id: departamento.id } },
      relations: ['departamento'],
    });

    if (!existingMunicipio) {
      const newMunicipio = this.municipioRepository.create({
        nombre: 'Tegucigalpa',
        departamento: departamento,
        isActive: true,
      });
      return await this.municipioRepository.save(newMunicipio);
    }
    return existingMunicipio;
  }

  private async createAdminUser(
    pai: Pai,
    departamento: DepartamentosPai,
    municipio: MunicipiosDepartamentosPai,
  ) {
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'Administrador' },
    });

    if (!adminRole) {
      throw new Error('Rol Administrador no encontrado');
    }

    const adminEmail =
      this.configService.get('ADMIN_EMAIL') || 'admin@example.com';
    const adminPassword =
      this.configService.get('ADMIN_PASSWORD') || 'Admin123*';

    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const adminUser = this.userRepository.create({
        email: adminEmail,
        password: bcrypt.hashSync(adminPassword, 10),
        name: 'Administrador',
        direccion: 'Tegucigalpa, Honduras',
        telefono: '8770-9116',
        identificacion: '1201-2000-00131',
        role: adminRole,
        isActive: true,
        isAuthorized: true,
        pais: pai,
        departamento: departamento,
        municipio: municipio,
      });

      await this.userRepository.save(adminUser);
    }
  }
}
