export interface IProgress {
  todoCount?: number;
  inProgressCount?: number;
  completeCount?: number;
  handleFilter?: (status: string) => void;
}
