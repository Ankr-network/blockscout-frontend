import { makeStyles } from 'tss-react/mui';

export const useDeleteWhitelistDialogStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));
