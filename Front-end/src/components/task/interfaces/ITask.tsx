import { STATUS } from "../../form/enums/STATUS";
import { IBody } from "./IBody";
import { IFooter } from "./IFooter";
import { IHeader } from "./IHeader";

export interface ITask extends IHeader, IBody, IFooter {
  status?: STATUS;
  handleManageTask?: (id: number) => void;
}
