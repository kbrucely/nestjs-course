import { Exclude } from "class-transformer";
import { User } from "../auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(_type => User, user => user.tasks, { eager: false }) // eager means we don't retrieve when we call a task
  @Exclude({ toPlainOnly: true })
  user: User;
}