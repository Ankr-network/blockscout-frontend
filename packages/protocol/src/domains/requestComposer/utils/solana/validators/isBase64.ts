export const isBase64 = (value: string): boolean => {
  try {
    window.btoa(value);

    return true;
  } catch {
    return false;
  }
};
