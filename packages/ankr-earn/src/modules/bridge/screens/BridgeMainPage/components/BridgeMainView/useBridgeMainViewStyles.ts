import { makeStyles } from '@material-ui/core';

export const useBridgeMainViewStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10, 3, 4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 6, 4),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(7.5),
      fontSize: 36,
    },
  },

  tokenInputControl: {
    marginBottom: theme.spacing(3),
  },

  tokenInputRoot: {
    [theme.breakpoints.up('md')]: {
      height: 80,
    },
  },

  tokenInput: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      height: '100%',
    },
  },

  tokenInputStart: {
    paddingLeft: 0,
  },

  tokenSelect: {
    [theme.breakpoints.up('md')]: {
      border: 'none',
      borderRadius: '0',
      height: '100%',
    },
  },

  tokenSelectRoot: {
    [theme.breakpoints.up('md')]: {
      flexShrink: 0,
      height: '100%',
    },
  },

  tokenFieldDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  maxBtn: {
    marginLeft: theme.spacing(2),
  },

  switcher: {
    '& [aria-disabled] > div': {
      color: theme.palette.text.secondary,
      cursor: 'default',
    },
  },

  submitBtn: {
    width: '100%',
    height: 54,
    marginTop: theme.spacing(6),
  },
  anotherCheckbox: {
    margin: theme.spacing(0, 0, 3),
    display: 'grid',
    flexDirection: 'column',
  },
  anotherAddress: {
    margin: theme.spacing(2, 0, 0),
  },
  willReceive: {
    fontWeight: 'bold',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: theme.spacing(3, 0, 0),

    '& span:last-child': {
      justifySelf: 'flex-end',
    },
  },

  footer: {
    marginTop: theme.spacing(5),
  },

  footerBtn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(0, 2),

    [theme.breakpoints.up('sm')]: {
      gap: theme.spacing(0, 3),
    },
  },

  finishBridge: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),
  },

  balance: {
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    fontSize: 12,
    position: 'relative',
    marginBottom: theme.spacing(1.25),
    zIndex: 1,

    color: theme.palette.text.secondary,
    gridTemplateColumns: 'auto auto',
    justifyContent: 'start',
    gap: theme.spacing(0, 1),
  },

  stepperLabel: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: '100%',
    border: '1.5px solid rgba(255, 255, 255, 0.3)',
    lineHeight: '20px',
    textAlign: 'center',
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
    fontWeight: 600,
    fontSize: '14px',
  },

  stepperLabelDisabled: {
    borderColor: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
    fontSize: '14px',
  },

  approvalSettings: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '16px',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5),
    cursor: 'pointer',
  },
}));
