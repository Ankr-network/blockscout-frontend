export interface DataWithErrorMessage {
  error: {
    message?: string;
  };
}

export const withErrorMessage = (
  data: Record<string, any>,
): data is DataWithErrorMessage =>
  'error' in data && typeof data.error.message === 'string';
