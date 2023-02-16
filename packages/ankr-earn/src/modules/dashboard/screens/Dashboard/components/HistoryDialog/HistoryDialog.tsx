import { Token } from 'modules/common/types/token';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { Dialog } from 'uiKit/Dialog';

import { HistoryDialogContent } from './HistoryDialogContent';
import { useHistoryDialogStyles } from './useHistoryDialogStyles';

export const HistoryDialog = (): JSX.Element => {
  const classes = useHistoryDialogStyles();

  const {
    isOpened,
    context: defaultSelectedToken,
    handleClose,
  } = useDialog<Token>(EKnownDialogs.history);

  return (
    <Dialog className={classes.root} open={isOpened} onClose={handleClose}>
      <HistoryDialogContent defaultSelectedToken={defaultSelectedToken} />
    </Dialog>
  );
};
