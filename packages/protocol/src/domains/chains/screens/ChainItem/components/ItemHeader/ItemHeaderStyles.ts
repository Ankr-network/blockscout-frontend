import { Theme, makeStyles } from '@material-ui/core';

export const useItemHeaderStyles = makeStyles<Theme>(theme => ({
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    lineHeight: `${theme.spacing(3.5)}px`,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(3)}px`,
    },
  },
  timeframe: {
    display: 'flex',
    alignItems: 'center',

    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,

    borderRadius: theme.spacing(1),

    background: theme.palette.background.default,

    letterSpacing: '0.01em',
    color: theme.palette.grey[600],

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
