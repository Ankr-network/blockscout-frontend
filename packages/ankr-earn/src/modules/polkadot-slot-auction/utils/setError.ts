import { getETHNetworkErrMsg } from './getETHNetworkErrMsg';

/**
 *  @deprecated
 *
 *  Note: For a quick release only
 *  TODO Please to remove it
 */
export const setErrorMsg = (message: string): string => {
  if (
    message.includes("Returned values aren't valid, did it run Out of Gas?") ||
    message.includes(
      'JsonRpcEngine: Response has no error or result for request',
    )
  ) {
    return `Error: ${getETHNetworkErrMsg()}`;
  }

  return message;
};
