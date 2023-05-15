import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import Task from "./Task";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  taskId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  position: number;

  @Column({ default: 0 })
  checked: number;

  @ManyToOne(() => Task, (e) => e.todo)
  @JoinColumn({ name: "taskId", referencedColumnName: "id" })
  task: Task;
}
