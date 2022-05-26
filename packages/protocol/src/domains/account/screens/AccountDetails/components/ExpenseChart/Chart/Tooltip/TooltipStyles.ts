import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  tooltipRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(2, 3),
    borderRadius: 18,

    backgroundColor: '#ffffff',

    boxShadow:
      '0 0 25px rgba(31, 34, 38, 0.1), 0 5px 100px rgba(31, 34, 38, 0.15)',

    letterSpacing: '0.01em',

    // fontFamily: 'Inter';
    fontSize: 14,
    lineHeight: '20px',
  },
  value: {
    color: theme.palette.text.primary,

    fontWeight: 700,
  },
  time: {
    color: theme.palette.grey[600],

    fontWeight: 400,
  },
}));
