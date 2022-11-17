import { makeStyles, Theme } from '@material-ui/core';

export const useInfoBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: theme.spacing(2.5),
    padding: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5),
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gridGap: theme.spacing(2.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  icon: {
    display: 'inline-flex',

    '& svg': {
      width: 48,
      height: '100%',
    },
  },
  message: {
    color: theme.palette.grey[800],

    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
}));
