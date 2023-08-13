import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return 'This action adds a new organization';
  }

  findAll() {
    return this.organizationsRepository.find({
      relations: {
        members: true,
      },
    });
  }

  findOne(id: string) {
    return this.organizationsRepository.findOne({
      relations: {
        members: true,
      },
      select: {
        members: {
          email: true,
          id: true,
        },
      },
      where: {
        id,
      },
    });
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: string) {
    return `This action removes a #${id} organization`;
  }
}
