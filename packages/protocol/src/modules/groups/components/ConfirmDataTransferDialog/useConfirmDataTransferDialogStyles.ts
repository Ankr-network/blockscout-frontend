import { makeStyles } from 'tss-react/mui';

export const useConfirmDataTransferDialogStyles = makeStyles()(theme => ({
  confirmDataTransferDialogCloseButton: {},
  confirmDataTransferDialogRoot: {
    maxWidth: 600,
  },
  confirmDataTransferDialogTitle: {
    marginBottom: theme.spacing(3),
  },
  confirmDataTransferDialogInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
  },
  confirmDataTransferDialogDescription: {
    a: {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
  confirmDataTransferWarning: {
    color: theme.palette.error.main,
  },
  confirmDataTransferDialogButtons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  confirmDataTransferDialogErrorText: {
    color: theme.palette.error.main,
  },
}));
