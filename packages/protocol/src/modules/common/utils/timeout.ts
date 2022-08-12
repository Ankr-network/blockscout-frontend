const TIMEOUT_FOR_TRANSACTION = 3000;

export const timeout = (ms = TIMEOUT_FOR_TRANSACTION) =>
  new Promise(res => setTimeout(res, ms));
