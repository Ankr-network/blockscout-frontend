import { makeStyles } from 'tss-react/mui';

export const useStartButtonStyles = makeStyles()(theme => ({
  root: {
    width: 180,
    height: 48,

    letterSpacing: '-0.01em',

    color: theme.palette.primary.contrastText,

    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  endIcon: {
    '&&': {
      svg: {
        fontSize: 24,
      },
    },
  },
}));
