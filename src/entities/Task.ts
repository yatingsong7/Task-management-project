import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { PRIORITY } from "../enums/priorityEnum";
import { STATUS } from "../enums/statusEnum";
import { Todo } from "./Todo";
import Note from "./Note";

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

  @OneToMany(() => Todo, (e) => e.task)
  todo: Todo[];

  @OneToMany(() => Note, (e) => e.task)
  notes: Note[];

  @ManyToMany(() => Task, (e) => e.preTask)
  @JoinTable({
    name: "prerequisite_task_assign",
    joinColumn: { name: "preTaskId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "mainTaskId", referencedColumnName: "id" },
  })
  mainTasks?: Task[];

  @ManyToMany(() => Task, (e) => e.mainTasks)
  preTask?: Task[];
}
