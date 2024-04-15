export const formatUnixSecondsToMilliseconds = (unixSeconds: string | number) =>
  Number(unixSeconds) * 1000;

export const getDateFromUnixSeconds = (unixSeconds: string | number) =>
  new Date(formatUnixSecondsToMilliseconds(unixSeconds));
