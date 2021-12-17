import { alpha } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSupportProjectFormStyles = makeStyles(theme => ({
  inputContainer: {
    textAlign: 'right',
  },
  inputFieldArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  },
  inputField: {
    '& > div': {
      border: 'none',
    },
    '& > p': {
      display: 'none',
    },

    '& input': {
      width: 190,
      padding: 0,
      backgroundColor: 'inherit',
      fontSize: 38,
      fontWeight: 700,
      textAlign: 'right',
    },
  },
  inputFieldLabel: {
    margin: theme.spacing(0, 0, 0, 2),
    fontSize: 22,
    fontWeight: 700,
  },
  inputCurrBalanceArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '10px 0 10px 0',
    fontSize: 14,
  },
  inputCurrBalance: {},
  inputCurrBalanceMaxBtn: {
    margin: '0 0 0 4px',
  },
  inputCurrBalanceTooltip: {
    margin: '0 0 0 7px',
    padding: '0 0 0 1px',
  },
  inputErr: {
    color: theme.palette.error.main,
  },

  line: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 31,
  },
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.2)',
    margin: '42px -160px 0',
    padding: '50px 160px 0',
    display: 'flex',
  },
  disclaimerText: {
    marginLeft: theme.spacing(3),
    fontSize: 14,
  },
  disclaimerInput: {
    flex: 1,
  },
  button: {
    width: 216,
    boxSizing: 'content-box',
    marginLeft: 50,
  },
  buttonContainer: {
    display: 'flex',
    position: 'relative',

    '& svg': {
      position: 'absolute',
      top: 5,
      right: -60,
    },
  },
}));
