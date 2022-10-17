export const isInputValueBase64 = (input: string): boolean => {
  try {
    window.atob(input);

    return true;
  } catch {
    return false;
  }
};
