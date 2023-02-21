import { HistoryDialog } from 'modules/dashboard/components/HistoryDialog';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { TPolkadotToken } from 'modules/stake-polkadot/types';

import { PolkadotHistory } from './PolkadotHistory';

export const PolkadotHistoryDialog = (): JSX.Element => {
  const {
    isOpened,
    context: token,
    handleClose,
  } = useDialog<TPolkadotToken | undefined>(EKnownDialogs.polkadotHistory);

  return (
    <HistoryDialog isOpened={isOpened} onClose={handleClose}>
      <PolkadotHistory token={token} />
    </HistoryDialog>
  );
};
