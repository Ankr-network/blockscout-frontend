import { Theme, makeStyles } from '@material-ui/core';

export const useUSDBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: theme.spacing(3.75),
    padding: theme.spacing(2.5, 8.75, 2.5, 2.5),
    marginTop: theme.spacing(3.5),

    marginBottom: theme.spacing(3.5),
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5),
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  message: {
    color: theme.palette.grey[800],

    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    '& b': {
      color: theme.palette.warning.main,
    },
  },
}));
