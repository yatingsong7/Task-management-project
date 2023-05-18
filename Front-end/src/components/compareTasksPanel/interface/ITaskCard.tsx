import { ITaskApi } from "../../tasksArea/interfaces/ITaskApi";

export interface ITaskCard {
  task: ITaskApi;
  isMain: boolean;
}
