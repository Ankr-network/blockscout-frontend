import { AvailableStakingWriteProviders } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useDisconnectMutation } from '../actions/disconnect';

interface IUseReconnect {
  reconnect: () => Promise<void>;
}

export const useReconnect = (
  provider: AvailableStakingWriteProviders,
): IUseReconnect => {
  const [disconnect] = useDisconnectMutation({ fixedCacheKey: provider });

  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const reconnect = async () => {
    await disconnect(provider).unwrap();
    handleOpen();
  };

  return { reconnect };
};
