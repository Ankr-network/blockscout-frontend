import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  section: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3.75),

    '&:not(:last-child)': {
      marginBottom: theme.spacing(4.5),
    },
  },
}));
