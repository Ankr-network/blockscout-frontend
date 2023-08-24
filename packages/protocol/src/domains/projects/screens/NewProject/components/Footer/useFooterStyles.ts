import { makeStyles } from 'tss-react/mui';

export const useFooterStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    marginTop: theme.spacing(8),
  },
  rightWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
  },
  skipButton: {
    color: theme.palette.text.secondary,
  },
}));
