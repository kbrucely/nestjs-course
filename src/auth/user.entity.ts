import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../tasks/task.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(_type => Task, task => task.user, { eager: true }) // means we'll find all tasks when finding a user
    tasks: Task[];
}