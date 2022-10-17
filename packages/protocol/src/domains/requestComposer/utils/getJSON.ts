export const getJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    return undefined;
  }
};
