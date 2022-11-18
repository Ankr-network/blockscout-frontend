import { queryFnWrapper } from '@ankr.com/utils';

import { showNotification } from 'modules/notifications';

import { getErrMsg, TError } from '../utils/getErrMsg';

export const queryFnNotifyWrapper = queryFnWrapper({
  onNotification({ api, error, uuid, onError }) {
    const errMsg =
      typeof onError === 'function'
        ? onError(error)
        : getErrMsg(error as TError);

    api.dispatch(
      showNotification({
        key: `${uuid}_ERROR`,
        message: `Error: ${errMsg}`,
        variant: 'error',
      }),
    );
  },
});
