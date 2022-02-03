import { makeStyles } from '@material-ui/core';

export const useSwitchBannerStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: theme.spacing(1, 2.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, auto)',
    },
  },

  image: {
    width: 30,
    height: 30,

    [theme.breakpoints.up('sm')]: {
      width: 46,
      height: 46,
    },
  },

  text: {
    fontSize: 14,

    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
  },

  btn: {
    width: 130,
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 16,
  },
}));
