export const hasResponseError = (response: any) => {
  if (!response) {
    return false;
  }

  if ('data' in response && 'error' in response.data) {
    return true;
  }

  return 'error' in response;
};
