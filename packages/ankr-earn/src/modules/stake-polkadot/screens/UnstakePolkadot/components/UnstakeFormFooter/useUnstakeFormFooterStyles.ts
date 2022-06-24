import { alpha, makeStyles } from '@material-ui/core';

export const useUnstakeFormFooterStyles = makeStyles(theme => ({
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
}));
