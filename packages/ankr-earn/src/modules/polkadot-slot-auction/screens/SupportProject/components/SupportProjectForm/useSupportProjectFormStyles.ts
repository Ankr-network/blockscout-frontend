import { Theme } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

export const useSupportProjectFormStyles = makeStyles((theme: Theme) => ({
  inputArea: {},
  inputContainer: {
    margin: theme.spacing(2, 0, 2.25, 0),
  },
  inputFieldArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
  },
  inputField: {
    width: '100%',
    height: 'auto',

    '& > div': {
      backgroundColor: 'inherit !important',
      border: 'none',
    },
    '& > p': {
      display: 'none',
    },

    '& input': {
      width: '100%',
      padding: '0 0 0 20px',
      backgroundColor: 'inherit',
      fontSize: 16,
    },
  },
  inputFieldLabelArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: theme.spacing(4),
    padding: theme.spacing(0, 3, 0, 2),
    fontSize: 16,
    fontWeight: 600,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  },
  inputFieldLabel: {
    margin: '6px 0 0 0',
  },
  inputCurrBalanceArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(2.25, 0, 1, 0),
    fontSize: 14,
  },
  inputCurrBalanceText: {
    color: alpha(theme.palette.text.primary, 0.6),
  },
  inputCurrBalanceVal: {
    margin: theme.spacing(0, 0, 0, 0.5),
    color: theme.palette.primary.main,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  inputCurrBalanceTooltip: {
    margin: '-2px 0 0 4px',
    padding: 0,
    border: 'none',

    '&:active': {
      transform: 'none',
    },
  },
  inputErr: {
    color: theme.palette.error.main,
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4, 0, 0, 0),
    borderTop: '1px solid #e0e6ef',
  },
  disclaimerInput: {
    margin: theme.spacing(0, 0, 5.5, 1.125),

    '& > div > p': {
      margin: '8px 0 0 -9px',
      fontSize: 14,
    },
  },
  disclaimerText: {
    marginLeft: 13,
    color: alpha(theme.palette.text.primary, 0.6),
    fontSize: 14,
  },
  button: {
    position: 'relative',
    width: '100%',
    height: 60,

    '& svg': {
      position: 'absolute',
      width: 60,
      height: 60,
    },
  },
}));
