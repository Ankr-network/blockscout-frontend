export interface DataWithStringError {
  Error: string;
}

export const withStringError = (
  data: Record<string, any>,
): data is DataWithStringError =>
  'Error' in data && typeof data.Error === 'string';
