export const safeStringifyJSON = (s: unknown) => {
  try {
    return JSON.stringify(s);
  } catch {
    return s as string;
  }
};
