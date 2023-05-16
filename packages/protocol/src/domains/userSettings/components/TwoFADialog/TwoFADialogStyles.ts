import { makeStyles } from 'tss-react/mui';

export const useTwoFADialogStyles = makeStyles()(theme => ({
  title: {
    display: 'inline-block',
    paddingRight: theme.spacing(8),
  },
}));
