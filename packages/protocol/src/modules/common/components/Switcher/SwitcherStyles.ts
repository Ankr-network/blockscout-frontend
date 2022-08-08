import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  switcherRoot: {
    height: 'auto',
    minWidth: 'auto',
    padding: '3px 7px',

    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 500,
    fontSize: 11,
    lineHeight: '16px',

    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.action.disabledBackground}`,
      borderColor: theme.palette.action.disabledBackground,

      color: theme.palette.grey[600],
    },
  },
}));
