import { makeStyles } from 'tss-react/mui';

export const useTxAttributeStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: theme.palette.grey[900],
  },
  extraContent: {},
}));
