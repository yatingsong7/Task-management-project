export interface IFooter {
  inProgress?: boolean;
  complete?: boolean;
  handleSwitch?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  handleMark?: (id: number) => void;
  handleDelete?: (id: number) => void;
  id: number;
}
