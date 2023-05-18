import { PRIORITY } from "../../form/enums/PRIORITY";
import { STATUS } from "../../form/enums/STATUS";

export interface ITaskApi {
  id: number;
  title: string;
  description?: string;
  date: Date;
  status: STATUS;
  priority: PRIORITY;
  notes: INote[];
  todos: ITodo[];
  preTasks: ITaskApi[];
}

export interface IFilterGroup {
  filterResults: ITaskApi[] | undefined;
  data: ITaskApi[] | undefined;
  setFilterResults: React.Dispatch<React.SetStateAction<ITaskApi[] | undefined>> | undefined;
}

export interface INote {
  id: number;
  taskId: number;
  content: string;
  date: Date;
}

export interface ITodo {
  id: number;
  taskId: number;
  title: string;
  position: number;
  checked: number;
}
