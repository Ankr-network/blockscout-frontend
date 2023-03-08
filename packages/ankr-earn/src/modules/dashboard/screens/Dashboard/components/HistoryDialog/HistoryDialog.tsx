import { Token } from 'modules/common/types/token';
import { HistoryDialog as HistoryDialogUI } from 'modules/dashboard/components/HistoryDialog';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { HistoryDialogContent } from './HistoryDialogContent';

export const HistoryDialog = (): JSX.Element => {
  const {
    isOpened,
    context: defaultSelectedToken,
    handleClose,
  } = useDialog<Token>(EKnownDialogs.history);

  return (
    <HistoryDialogUI isOpened={isOpened} onClose={handleClose}>
      <HistoryDialogContent defaultSelectedToken={defaultSelectedToken} />
    </HistoryDialogUI>
  );
};
