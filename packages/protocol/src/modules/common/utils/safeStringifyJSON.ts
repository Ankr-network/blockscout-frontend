export const safeStringifyJSON = (s: any): any => {
  try {
    return JSON.stringify(s);
  } catch {
    return s;
  }
};
