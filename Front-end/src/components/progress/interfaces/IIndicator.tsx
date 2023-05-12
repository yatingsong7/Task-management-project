export enum INDICATOR_COLOR {
  primary = "primary",
  secondary = "secondary",
  inherit = "inherit",
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

export interface IIndicator {
  color: INDICATOR_COLOR;
  label: string;
  count: number;
  handleFilter?: (status: string) => void;
}
