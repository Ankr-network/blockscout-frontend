import { makeStyles } from '@material-ui/core';

export const useProviderDialogStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,

    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },

  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      maxWidth: 460,
      margin: theme.spacing(0, 'auto', 3.75),
      textAlign: 'center',
      fontSize: 30,
    },
  },

  text: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: theme.spacing(2.5),
  },
}));
