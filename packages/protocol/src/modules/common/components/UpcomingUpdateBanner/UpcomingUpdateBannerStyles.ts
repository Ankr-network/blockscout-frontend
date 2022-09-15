import { makeStyles, Theme } from '@material-ui/core';

export const useUpcomingUpdateBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: theme.spacing(3.75),
    padding: theme.spacing(2.5, 8.75, 2.5, 2.5),
    marginBottom: theme.spacing(3.5),
    backgroundColor: theme.palette.common.white,

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
  message: {
    color: theme.palette.grey[800],

    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
}));
