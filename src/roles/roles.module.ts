import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
})
export class RolesModule {}
