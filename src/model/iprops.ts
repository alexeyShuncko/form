export interface ErrorInput {
  name: boolean;
  email: boolean;
  tel: boolean;
  date: boolean;
}

export interface ValueInput {
  name: string;
  email: string;
  tel: string[];
  date: string;
}

export interface IProps {
  setValue: React.Dispatch<ValueInput>;
  valueInp: ValueInput;
  setError: React.Dispatch<ErrorInput>;
  error: ErrorInput;
}
