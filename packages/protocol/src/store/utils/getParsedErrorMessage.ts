import { intervalToDuration } from 'date-fns';

export const getParsedErrorMessage = (error: unknown): string => {
  try {
    // @ts-ignore error is unknown.
    const errorMessage = error.response.data.error.message;

    const errorObject = errorMessage.substring(
      errorMessage.indexOf('{'),
      errorMessage.length,
    );

    const { params }: { params: any } = JSON.parse(errorObject);

    if (params.resendableInMs) {
      return `Try again in ${intervalToDuration(params.resendableInMs)}`;
    }

    if (typeof params === 'string') {
      return params;
    }

    return JSON.stringify(params);
  } catch (e) {
    return '';
  }
};
