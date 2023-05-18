import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PRIORITY } from "../enums/priorityEnum";
import { STATUS } from "../enums/statusEnum";
import Note from "./Note";
import { Todo } from "./Todo";

@Entity()
export default class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column({ type: "longtext", nullable: true })
  description: string;

  @Column({ nullable: true })
  date: string;

  @Column()
  status: STATUS;

  @Column()
  priority: PRIORITY;

  @OneToMany(() => Todo, (e) => e.task, { onDelete: "CASCADE" })
  todos: Todo[];

  @OneToMany(() => Note, (e) => e.task, { onDelete: "CASCADE" })
  notes: Note[];

  @ManyToMany(() => Task, (e) => e.preTasks, { onDelete: "CASCADE" })
  @JoinTable({
    name: "related_task_assign",
    joinColumn: { name: "preTaskId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "mainTaskId", referencedColumnName: "id" },
  })
  mainTasks?: Task[];

  @ManyToMany(() => Task, (e) => e.mainTasks, { onDelete: "CASCADE" })
  preTasks?: Task[];
}
