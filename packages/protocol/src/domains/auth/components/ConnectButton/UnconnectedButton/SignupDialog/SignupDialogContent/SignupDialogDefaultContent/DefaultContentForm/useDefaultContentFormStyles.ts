import { makeStyles } from 'tss-react/mui';

export const useDefaultContentFormStyles = makeStyles()(theme => ({
  button: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(5),

    '&+&': {
      marginBottom: theme.spacing(10),
    },

    '&.Mui-disabled': {
      background: 'transparent',

      svg: {
        opacity: 0.5,
      },
    },
  },

  label: {
    fontWeight: 400,

    '& a, & b': {
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
  },
  error: {
    fontWeight: 500,
    color: theme.palette.error.main,
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    left: -2,
    marginBottom: theme.spacing(8),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  formLabel: {
    alignItems: 'flex-start',

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },

    '& svg': {
      width: 18,
    },
  },
}));
