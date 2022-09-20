import { FieldProps, FieldRenderProps } from 'react-final-form';

export enum FetchABIError {
  INVALID_JSON_OR_URL = 'INVALID_JSON_OR_URL',
}

export type Field = FieldProps<string, FieldRenderProps<string>>;

export type Subfield = {
  placeholder?: string;
  description?: string;
  validate: (value: string) => boolean;
};
