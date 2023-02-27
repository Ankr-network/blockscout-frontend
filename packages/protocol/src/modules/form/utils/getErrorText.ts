import { FieldMetaState } from 'react-final-form';
import { hasError as hasErrorDefault } from './hasError';

export function getErrorText(
  meta: FieldMetaState<any>,
  hasError: (meta: FieldMetaState<any>) => boolean = hasErrorDefault,
) {
  return hasError(meta) ? meta.error || meta.submitError : undefined;
}
