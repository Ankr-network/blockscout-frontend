import { makeStyles } from 'tss-react/mui';

export const useTransferOwnershipDialogStyles = makeStyles()(theme => ({
  content: {
    width: 520,
    marginBottom: theme.spacing(8),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));
