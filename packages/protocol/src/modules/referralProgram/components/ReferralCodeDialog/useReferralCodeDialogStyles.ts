import { makeStyles } from 'tss-react/mui';

export const useReferralCodeDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(8),
  },
}));
