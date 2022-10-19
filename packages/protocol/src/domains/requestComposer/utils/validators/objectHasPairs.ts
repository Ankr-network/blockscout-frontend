import JSON5 from 'json5';

export const objectHasPairs = (
  stringOfObject: string,
  keyValues?: Record<string, any>,
): boolean => {
  try {
    const parsed = JSON5.parse(stringOfObject);

    let isValid = true;

    Object.entries(keyValues || {}).forEach(([key, value]) => {
      if (isValid && parsed[key] !== value) {
        isValid = false;
      }
    });

    return isValid;
  } catch {
    return false;
  }
};
