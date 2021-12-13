import { FieldMetaState } from 'react-final-form';

export function hasError(meta: FieldMetaState<any>) {
  return (
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched
  );
}

export function getErrorText(meta: FieldMetaState<any>) {
  return hasError(meta) ? meta.error || meta.submitError : undefined;
}
