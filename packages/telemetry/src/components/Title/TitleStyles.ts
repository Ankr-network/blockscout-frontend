import { makeStyles } from 'tss-react/mui';

export const useTitleStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.grey[900],

    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '22px',
  },
}));
