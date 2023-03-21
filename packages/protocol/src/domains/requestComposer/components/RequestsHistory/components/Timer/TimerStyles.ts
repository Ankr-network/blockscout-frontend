import { makeStyles } from 'tss-react/mui';

export const useTimerStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.primary.main,

    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px',
  },
  icon: {
    fontSize: 20,
  },
}));
