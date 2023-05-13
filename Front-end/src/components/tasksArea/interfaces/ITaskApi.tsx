import { PRIORITY } from "../../form/enums/PRIORITY";
import { STATUS } from "../../form/enums/STATUS";

export interface ITaskApi {
  id: number;
  title: string;
  description?: string;
  date: Date;
  status: STATUS;
  priority: PRIORITY;
}

export interface IFilterGroup {
  filterResults: ITaskApi[] | undefined;
  data: ITaskApi[] | undefined;
  setFilterResults: React.Dispatch<React.SetStateAction<ITaskApi[] | undefined>> | undefined;
}
