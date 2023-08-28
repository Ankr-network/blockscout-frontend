import { makeStyles } from 'tss-react/mui';

export const useFreezeAndUnfreezeProjectDialogStyles = makeStyles()(theme => ({
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
}));
