import { getExtendedErrorText } from './getExtendedErrorText';

type TGetOnErrorWithCustomText = (error: unknown) => string;

/**
 * Adds additional error text.
 *
 * @return callback onError
 */
export function getOnErrorWithCustomText(
  errorText: string,
): TGetOnErrorWithCustomText {
  return (error: unknown) => getExtendedErrorText(error, errorText);
}
