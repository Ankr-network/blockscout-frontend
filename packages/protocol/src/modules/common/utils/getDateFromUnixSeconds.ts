export const formatUnixSecondsToMilliseconds = (unixSeconds: number) =>
  unixSeconds * 1000;

export const getDateFromUnixSeconds = (unixSeconds: number) =>
  new Date(formatUnixSecondsToMilliseconds(unixSeconds));
