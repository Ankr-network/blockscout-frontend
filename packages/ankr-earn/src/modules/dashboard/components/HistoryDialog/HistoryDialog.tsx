import { Dialog } from 'uiKit/Dialog';

import { useHistoryDialogStyles } from './useHistoryDialogStyles';

interface IHistoryDialogProps {
  children: JSX.Element;
  isOpened: boolean;
  onClose: VoidFunction;
}

export const HistoryDialog = ({
  children,
  isOpened,
  onClose,
}: IHistoryDialogProps): JSX.Element => {
  const classes = useHistoryDialogStyles();

  return (
    <Dialog className={classes.root} open={isOpened} onClose={onClose}>
      {children}
    </Dialog>
  );
};
