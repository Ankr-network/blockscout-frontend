import { makeStyles } from 'tss-react/mui';

export const useConfirmInputStyles = makeStyles()(theme => ({
  confirmDataTransferDialogErrorText: {
    color: theme.palette.error.main,
  },
}));
