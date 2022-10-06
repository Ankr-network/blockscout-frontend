export const getJSON = (value: string): Record<string, unknown> | undefined => {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};
