import { FieldMetaState } from 'react-final-form';

export function hasError(meta: FieldMetaState<unknown>): boolean {
  return (
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched
  );
}

export function getErrorText(
  meta: FieldMetaState<unknown>,
): string | undefined {
  return hasError(meta) ? meta.error || meta.submitError : undefined;
}
