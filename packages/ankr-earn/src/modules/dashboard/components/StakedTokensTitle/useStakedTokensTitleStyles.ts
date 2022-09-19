import { makeStyles } from '@material-ui/core';

export const useStakedTokensTitleStyles = makeStyles(theme => ({
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      marginBottom: theme.spacing(4),
    },
  },
}));
