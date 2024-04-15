import { makeStyles } from 'tss-react/mui';

export const usePriceStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.primary,

    letterSpacing: '-0.04em',

    fontSize: 28,
    fontWeight: 700,
    lineHeight: '44.1px',

    span: {
      span: {
        color: theme.palette.text.secondary,

        letterSpacing: '-0.01em',

        fontSize: 20,
        fontWeight: 400,
        lineHeight: '140%',
      },
    },

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '-0.03em',

      fontSize: 31,
      fontWeight: 700,
      lineHeight: '110%',
    },
  },
}));
