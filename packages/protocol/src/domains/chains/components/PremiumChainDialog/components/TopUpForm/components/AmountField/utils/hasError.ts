import { FieldMetaState } from 'react-final-form';

export const hasError = (meta: FieldMetaState<string>) =>
  (meta.submitError && !meta.dirtySinceLastSubmit) || meta.error;
