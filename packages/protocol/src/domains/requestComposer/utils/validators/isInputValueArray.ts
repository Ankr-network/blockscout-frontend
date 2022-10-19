import JSON5 from 'json5';

export const isInputValueArray = (input: string): boolean => {
  try {
    const parsed = JSON5.parse(input);

    return Array.isArray(parsed);
  } catch {
    return false;
  }
};
