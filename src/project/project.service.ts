import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const newProject = this.projectsRepository.create(createProjectDto);

    newProject.users = [user];

    return this.projectsRepository.save(createProjectDto);
  }

  findAll(userId: string) {
    return this.projectsRepository.find({
      where: {
        users: {
          id: userId,
        },
      },
      relations: {
        boards: true,
        issues: true,
        sprints: true,
      },
    });
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: {
        boards: true,
        issues: true,
        sprints: true,
      },
    });
    if (!project) throw new HttpException('Project not found', 404);

    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
