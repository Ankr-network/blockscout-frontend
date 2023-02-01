import { getErrMsg } from './getErrMsg';

type TGetOnErrorWithCustomText = (error: unknown) => string;

/**
 * Adds additional error text.
 *
 * @return  custom text + original error
 */
export function getOnErrorWithCustomText(
  errorText: string,
): TGetOnErrorWithCustomText {
  return (error: unknown) => {
    const message = getErrMsg(error);
    return `${errorText}. 📄 ${message}`;
  };
}
