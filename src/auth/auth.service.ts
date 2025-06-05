import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Pai } from 'src/pais/entities/pai.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MailService } from 'src/mail/mail.service';
import { PaginationDto } from '../common/dto/pagination-common.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Pai) private readonly paisRepo: Repository<Pai>,
    @InjectRepository(MunicipiosDepartamentosPai)
    private readonly municipioRepo: Repository<MunicipiosDepartamentosPai>,
    @InjectRepository(DepartamentosPai)
    private readonly departamentoRepo: Repository<DepartamentosPai>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {
      email,
      name,
      password,
      direccion,
      identificacion,
      telefono,
      pais: paisId,
      departamento: departamentoId,
      municipio: municipioId,
      rol,
    } = createUserDto;

    const pais_existe = await this.paisRepo.findOne({ where: { id: paisId } });
    if (!pais_existe) {
      throw new BadRequestException('No se encontró el país seleccionado.');
    }

    const departamento_existe = await this.departamentoRepo.findOne({
      where: { id: departamentoId },
    });
    if (!departamento_existe) {
      throw new BadRequestException(
        'No se encontró el departamento seleccionado.',
      );
    }

    const municipio_existe = await this.municipioRepo.findOne({
      where: { id: municipioId },
    });
    if (!municipio_existe) {
      throw new BadRequestException(
        'No se encontró el municipio seleccionado.',
      );
    }

    try {
      const user = this.userRepository.create({
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        direccion,
        identificacion,
        telefono,
        rol,
        pais: pais_existe,
        departamento: departamento_existe,
        municipio: municipio_existe,
      });

      await this.userRepository.save(user);
      delete user.password;

      return user;
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user)
        throw new UnauthorizedException('Credenciales incorrectas (email)');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(
          'Credenciales incorrectas (contrasena)',
        );

      if (user.isActive === false)
        throw new UnauthorizedException(
          'Credenciales incorrectas, usario desactivado.',
        );

      if (user.isAuthorized === false)
        throw new UnauthorizedException(
          'Credenciales incorrectas, usario no autorizado.',
        );

      const token = this.getJwtToken({ id: user.id });

      delete user.password;

      return { ...user, token };
    } catch (error) {
      throw error;
    }
  }

  async actualizarContrasena(updatePassword: UpdatePasswordDto) {
    const { email, nuevaContrasena } = updatePassword;

    try {
      const usuario = await this.userRepository.findOne({ where: { email } });

      if (!usuario) {
        throw new NotFoundException('El correo no existe en la base de datos');
      }

      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
      usuario.password = hashedPassword;

      await this.mailService.sendEmailConfirm(email, nuevaContrasena);
      await this.userRepository.save(usuario);
      return 'Contraseña actualizada exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async getUsers(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, name, rol } = paginationDto;
    try {
      const whereConditions: any = {};

      if (name) {
        whereConditions.name = ILike(`%${name}%`);
      }

      if (rol) {
        whereConditions.rol = rol;
      }

      const [usuarios, total] = await this.userRepository.findAndCount({
        where: whereConditions,
        skip: offset,
        take: limit,
        order: {
          name: 'ASC',
        },
      });
      if (!usuarios || usuarios.length === 0) {
        throw new NotFoundException(
          'No se encontraron usuario en este momento.',
        );
      }

      const users = instanceToPlain(usuarios);

      return { users, total };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const usuario = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!usuario)
        throw new NotFoundException('No se encontro el usuario seleccionado.');
      return instanceToPlain(usuario);
    } catch (error) {
      throw error;
    }
  }

  async actualizarUsuario(userId: string, updateUsuarioDto: UpdateUserDto) {
    try {
      const usuario = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['pais'],
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (updateUsuarioDto.pais) {
        const pais = await this.paisRepo.findOne({
          where: { id: updateUsuarioDto.pais },
        });
        if (!pais) {
          throw new BadRequestException('El país seleccionado no existe');
        }
        usuario.pais.id = pais.id;
      }

      const camposActualizables = [
        'email',
        'name',
        'identificacion',
        'direccion',
        'telefono',
        'rol',
        'isActive',
        'isAuthorized',
      ];

      camposActualizables.forEach((campo) => {
        if (updateUsuarioDto[campo] !== undefined) {
          usuario[campo] = updateUsuarioDto[campo];
        }
      });

      if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
        const emailExiste = await this.userRepository.findOne({
          where: { email: updateUsuarioDto.email },
        });
        if (emailExiste && emailExiste.id !== userId) {
          throw new BadRequestException(
            'El correo electrónico ya está registrado',
          );
        }
      }

      await this.userRepository.save(usuario);

      const usuarioActualizado = instanceToPlain(usuario);
      delete usuarioActualizado.password;

      return usuarioActualizado;
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    if (!this.jwtService) {
      throw new InternalServerErrorException('JwtService no está disponible');
    }
    return this.jwtService.sign(payload);
  }

  private handleDatabaseErrors(error: any): never {
    if (error.code === '23505') {
      const detail = error.detail.toLowerCase();

      if (detail.includes('email')) {
        throw new BadRequestException(
          'El correo electrónico ya está registrado',
        );
      }
      if (detail.includes('identificacion')) {
        throw new BadRequestException('La identificación ya está registrada');
      }
      if (detail.includes('telefono')) {
        throw new BadRequestException(
          'El número de teléfono ya está registrado',
        );
      }

      throw new BadRequestException('Registro duplicado: ' + error.detail);
    }

    throw new error();
  }
}
