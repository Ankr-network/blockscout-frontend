export const padSeconds = (seconds: number) =>
  `00:${seconds.toString().padStart(2, '0')}`;
