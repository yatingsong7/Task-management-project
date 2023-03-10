import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PRIORITY } from "../enums/priorityEnum";
import { STATUS } from "../enums/statusEnum";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column({ type: "longtext", nullable: true })
  description: string;

  @Column()
  date: string;

  @Column()
  status: STATUS;

  @Column()
  priority: PRIORITY;
}
