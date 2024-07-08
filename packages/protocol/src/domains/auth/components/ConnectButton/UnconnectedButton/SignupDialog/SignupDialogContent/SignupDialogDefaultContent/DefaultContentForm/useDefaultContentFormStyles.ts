import { makeStyles } from 'tss-react/mui';

export const useDefaultContentFormStyles = makeStyles()(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(3),

    '&.Mui-disabled': {
      background: 'transparent',

      svg: {
        opacity: 0.5,
      },
    },
  },

  or: {
    fontWeight: 400,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },

  label: {
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
    marginBottom: theme.spacing(3),
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
  checkboxes: {
    marginTop: theme.spacing(1),
  },

  loginIcon: {
    '&&': {
      fontSize: 24,
      color: theme.palette.text.primary,
    },
  },
  description: {
    color: theme.palette.text.secondary,
  },
  agreementMessage: {
    marginTop: theme.spacing(1),

    textAlign: 'center',

    color: theme.palette.text.primary,

    a: {
      textDecoration: 'underline',
      textUnderlineOffset: '0.2em',
    },
  },
  extraContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: theme.spacing(4),
  },
}));
