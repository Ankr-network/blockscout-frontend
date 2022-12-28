export const getMethod = (url: string) =>
  url.substring(url.lastIndexOf('/') + 1);
