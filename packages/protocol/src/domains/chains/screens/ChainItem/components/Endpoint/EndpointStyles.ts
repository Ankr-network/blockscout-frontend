import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(3.2),
  },
  trafficFlow: {
    marginBottom: theme.spacing(3),
  },
  section: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3.75),

    '&:not(:last-child)': {
      marginBottom: theme.spacing(4.5),
    },
  },
}));
