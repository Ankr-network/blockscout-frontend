import { alpha, makeStyles } from '@material-ui/core';

export const useUnstakeDialogStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(8, 0, 4),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600,
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 4),
    },
  },

  footer: {
    marginTop: theme.spacing(4),
  },

  container: {
    maxWidth: 520 + theme.spacing(4),
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
    },
  },

  title: {
    maxWidth: 395,
    margin: theme.spacing(0, 'auto', 5),
    textAlign: 'center',
  },

  networkTitle: {
    margin: theme.spacing(-2, 'auto', 4, 'auto'),
  },

  amountLabel: {
    fontSize: '14px',
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),

    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,

    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  info: {
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(1.75),
    fontSize: 15,
  },

  timer: {
    whiteSpace: 'nowrap',
  },

  stepper: {
    maxWidth: 340,
    margin: '0 auto',
  },

  checkboxArea: {
    padding: theme.spacing(2.5, 0, 2.5, 0),
    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,

    '& label': {
      marginRight: 0,
      marginLeft: '-2px',
    },
  },

  addressArea: {
    margin: theme.spacing(3.125, 0, 0, 0),
  },

  labelTxt: {
    fontSize: 14,
    fontWeight: 700,
  },

  checkboxTxt: {
    margin: theme.spacing('3px', 0, 0, 1),
    fontSize: 14,
    fontWeight: 500,
  },

  addressField: {
    margin: theme.spacing(1.75, 0, 0, 0),
  },

  externalWrapper: {
    marginBottom: theme.spacing(3),
  },
}));
