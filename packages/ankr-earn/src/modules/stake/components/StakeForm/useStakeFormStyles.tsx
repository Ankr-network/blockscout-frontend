import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => {
  return {
    body: {
      padding: theme.spacing(6, 0, 4.5),
    },

    footer: {
      padding: theme.spacing(0, 0, 7.5, 0),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 0, 2.5, 0),
      },
    },

    wrapper: {
      padding: theme.spacing(0, 7.5),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
        margin: '0 auto',
      },
    },

    footerWrapper: {
      display: 'flex',
    },

    title: {
      textAlign: 'center',
      margin: theme.spacing(0, 0, 6),
      fontSize: 30,

      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(7.5),
      },
    },

    submit: {
      width: '100%',
      height: 54,
    },

    questionIcon: {
      color: theme.palette.text.secondary,
    },
  };
});
