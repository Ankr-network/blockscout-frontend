import JSON5 from 'json5';

export const isInputValueObject = (input: string): boolean => {
  try {
    const parsed = JSON5.parse(input);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};
