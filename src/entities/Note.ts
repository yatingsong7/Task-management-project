import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import Task from "./Task";

@Entity()
export default class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column({ type: "longtext" })
  content: string;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP(6)" })
  date: string;

  @ManyToOne(() => Task, (e) => e.notes)
  @JoinColumn({ name: "taskId", referencedColumnName: "id" })
  task: Task;
}
