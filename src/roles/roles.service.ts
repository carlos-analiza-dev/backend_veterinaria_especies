import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolRepo: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { name, description, isActive } = createRoleDto;
    try {
      const new_rol = this.rolRepo.create({
        name,
        description,
        isActive,
      });
      await this.rolRepo.save(new_rol);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const roles = await this.rolRepo.find({ where: { isActive: true } });
      if (!roles || roles.length === 0) {
        throw new NotFoundException('No se encontraron roles en este momento');
      }
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async findAllPaginate(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const [roles, total] = await this.rolRepo.findAndCount({
        skip: offset,
        take: limit,
      });
      if (!roles || roles.length === 0) {
        throw new NotFoundException('No se encontraron roles en este momento');
      }
      return { roles, total };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`No se encontró el rol con ID: ${id}`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    const updatedRole = this.rolRepo.merge(role, updateRoleDto);
    await this.rolRepo.save(updatedRole);

    return updatedRole;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
