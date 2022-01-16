import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return found;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const found = await this.taskRepository.delete(id);
    if (found.affected === 0){
      throw new NotFoundException(`Task with "${id}" not found`);
    }
  }
}
