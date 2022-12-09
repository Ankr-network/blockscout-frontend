export const safeParseJSON = (s: any): any => {
  try {
    return JSON.parse(s);
  } catch {
    try {
      return JSON.parse(s.replace(/\n/gi, '').replace(/'/g, '"'));
    } catch {
      return s;
    }
  }
};
