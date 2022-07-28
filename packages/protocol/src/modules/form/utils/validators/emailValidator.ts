import { t } from 'common';
import { isValidEmail } from 'modules/common/utils/isValidEmail';
import { Validator } from 'modules/form/types';

export const emailValidator: Validator<string | undefined> = (
  value,
): string | undefined => {
  if (!value?.trim()) return t('validation.required');

  if (!isValidEmail(value)) return t('validation.email-validation');

  return undefined;
};
