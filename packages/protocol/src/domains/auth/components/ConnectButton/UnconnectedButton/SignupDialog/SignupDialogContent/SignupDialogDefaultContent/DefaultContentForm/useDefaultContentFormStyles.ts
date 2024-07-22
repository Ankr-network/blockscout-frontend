import { makeStyles } from 'tss-react/mui';

export const useDefaultContentFormStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    marginTop: theme.spacing(6),
  },
  label: {
    '& a, & b': {
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
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
  },
}));
