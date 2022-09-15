import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => {
  return {
    box: {
      padding: theme.spacing(6, 2, 2.5),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6, 7.5, 6),
      },
    },

    footer: {
      marginTop: theme.spacing(5),
    },

    title: {
      textAlign: 'center',
      margin: theme.spacing(0, 0, 4),
      fontSize: 30,

      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(6),
      },
    },

    networkTitle: {
      margin: theme.spacing(-1, 'auto', 4, 'auto'),

      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(-4.5),
      },
    },

    submit: {
      height: 50,
      borderRadius: 16,
    },
  };
});
