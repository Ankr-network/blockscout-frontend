import { AvailableStakingWriteProviders } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useDisconnectMutation } from '../actions/disconnect';

interface IUseDisconnectAndOpenModal {
  disconnectAndOpenModal: () => Promise<void>;
}

export const useDisconnectAndOpenModal = (
  provider: AvailableStakingWriteProviders,
): IUseDisconnectAndOpenModal => {
  const [disconnect] = useDisconnectMutation({ fixedCacheKey: provider });

  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const disconnectAndOpenModal = async () => {
    await disconnect(provider).unwrap();
    handleOpen();
  };

  return { disconnectAndOpenModal };
};
