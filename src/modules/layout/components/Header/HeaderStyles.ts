import { fade, makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 66;
export const HEADER_HEIGHT_XL = 80;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.25, 0),
    borderBottom: `1px solid ${fade(theme.palette.text.primary, 0.15)}`,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: HEADER_HEIGHT_XS,

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(2, 0),
      height: HEADER_HEIGHT_XL,
    },
  },

  container: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(0, 2),
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'auto auto 1fr repeat(2, auto)',
      justifyContent: 'initial',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },

    [theme.breakpoints.up('WXGAPlus')]: {
      paddingLeft: theme.spacing(5.5),
      paddingRight: theme.spacing(5.5),
    },
  },
}));
