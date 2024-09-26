import { makeStyles } from 'tss-react/mui';

export const useTitleStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.grey[900],

    letterSpacing: '-0.03em',

    fontWeight: 700,
    fontSize: 28,
    lineHeight: '32px',
  },
}));
