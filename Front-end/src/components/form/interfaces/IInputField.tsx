export interface IInputField {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  defaultContent?: string;
}
