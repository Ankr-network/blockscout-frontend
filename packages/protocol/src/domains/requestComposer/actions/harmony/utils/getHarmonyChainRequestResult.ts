import { t } from '@ankr.com/common';

import { HarmonyMethodResponse } from 'domains/requestComposer/constants/harmony';
import { errorToObject } from '../../utils/errorToObject';
import { safeStringifyJSON } from 'modules/common/utils/safeStringifyJSON';
import { withErrorMessage } from '../../utils/withErrorMessage';
import { withStringError } from '../../utils/withStringError';

const MAX_BYTES_SIZE = 4_000_000;

export const getHarmonyChainRequestResult = (data: unknown, start: number) => {
  const time = performance.now() - start;

  let response: [HarmonyMethodResponse];

  if (data && typeof data === 'object') {
    if (withErrorMessage(data)) {
      return { error: errorToObject(data.error.message), time };
    }

    if (withStringError(data)) {
      return { error: errorToObject(data.Error), time };
    }

    try {
      response = [safeStringifyJSON(data) as HarmonyMethodResponse];
    } catch {
      response = [{}];
    }
  } else {
    response = [data as HarmonyMethodResponse];
  }

  const responseSize = JSON.stringify(data).length;

  if (responseSize > MAX_BYTES_SIZE) {
    return {
      error: new Error(
        t('request-composer.method-description.harmony.large-response-error'),
      ),
      time: performance.now() - start,
    };
  }

  return { response, time };
};
