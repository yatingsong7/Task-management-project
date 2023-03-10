import { SelectChangeEvent } from "@mui/material";

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface ISelectField {
  label: string;
  labelId: string;
  id: string;
  value: string;
  options: ISelectOptions[];
  onChange?: (s: SelectChangeEvent) => void;
}
