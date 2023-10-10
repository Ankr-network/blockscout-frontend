import { TextFieldProps } from '@mui/material';
import { FieldMetaState, FieldRenderProps } from 'react-final-form';

interface IFieldProps extends FieldRenderProps<string> {
  hasError?: (meta: FieldMetaState<any>) => boolean;
  isHelperTextVisible?: boolean;
  isLimitCounterVisible?: boolean;
  multiline?: boolean;
  isRequired?: boolean;
}

export interface GetHelperStringArguments {
  value: string;
  meta: FieldMetaState<any>;
  maxLength: number | null;
  showLimitCounter: boolean;
  hasError: (meta: FieldMetaState<any>) => boolean;
}

export type InputFieldProps = IFieldProps & TextFieldProps;
