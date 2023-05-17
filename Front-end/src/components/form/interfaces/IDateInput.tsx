export interface IDateInput {
  value: Date | null | undefined;
  onChange?: (date: Date | null | undefined) => void;
  label?: string;
}
