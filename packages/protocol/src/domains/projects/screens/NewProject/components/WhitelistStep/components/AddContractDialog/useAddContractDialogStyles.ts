import { makeStyles } from 'tss-react/mui';

export const useAddContractDialogStyles = makeStyles()(theme => ({
  root: {
    width: 520,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8),
    lineHeight: '22.4px',
  },

  proceedButton: {
    marginBottom: theme.spacing(3),
  },
}));
