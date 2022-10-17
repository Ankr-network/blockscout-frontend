import { getJSON } from './getJSON';

const MAX_RESPONSE_LENGTH_TO_PARSE = 1000;

export const checkErrorInTextResponse = (response: string) => {
  if (response.length < MAX_RESPONSE_LENGTH_TO_PARSE) {
    const json = getJSON(response);

    if (json?.error) {
      throw json.error;
    }
  }
};
