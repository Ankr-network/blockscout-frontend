import { getErrMsg } from './getErrMsg';

/**
 * Adds additional error text.
 *
 * @return  custom text + original error
 */
export const getExtendedErrorText = (
  error: unknown,
  additionalText: string,
): string => {
  const message = getErrMsg(error);
  return `${additionalText}. 📄 ${message}`;
};
