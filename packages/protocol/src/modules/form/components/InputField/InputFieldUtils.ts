import { t } from '@ankr.com/common';

import { getErrorText } from '../../utils/getErrorText';
import { GetHelperStringArguments } from './InputFieldTypes';

export const getHelperText = ({
  value,
  meta,
  maxLength,
  showLimitCounter,
  hasError,
}: GetHelperStringArguments): string => {
  let helperTextString: string = getErrorText(meta, hasError);

  if (showLimitCounter && maxLength && !hasError(meta)) {
    helperTextString = t('form.limit-counter', {
      value: value.length ?? 0,
      maxLimit: maxLength,
    });
  }

  return helperTextString;
};
