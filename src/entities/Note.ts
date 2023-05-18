import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => Task, (e) => e.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "taskId", referencedColumnName: "id" })
  task: Task;
}
