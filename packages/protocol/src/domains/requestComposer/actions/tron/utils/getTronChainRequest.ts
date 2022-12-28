import { FetchTronChainRequestResult } from '../types';
import { TronChainMethodResponse } from 'domains/requestComposer/types/tron';
import { errorToObject } from '../../utils/errorToObject';
import { safeStringifyJSON } from 'modules/common/utils/safeStringifyJSON';
import { withErrorMessage } from '../../utils/withErrorMessage';
import { withStringError } from '../../utils/withStringError';

export const getTronChainRequest = (
  data: unknown,
  start: number,
): FetchTronChainRequestResult => {
  const time = performance.now() - start;

  let response: [TronChainMethodResponse];

  if (typeof data === 'object' && data) {
    if (withErrorMessage(data)) {
      return { error: errorToObject(data.error.message), time };
    }

    if (withStringError(data)) {
      return { error: errorToObject(data.Error), time };
    }

    try {
      response = [safeStringifyJSON(data) as TronChainMethodResponse];
    } catch {
      response = [{}];
    }
  } else {
    response = [data as TronChainMethodResponse];
  }

  return { response, time };
};
