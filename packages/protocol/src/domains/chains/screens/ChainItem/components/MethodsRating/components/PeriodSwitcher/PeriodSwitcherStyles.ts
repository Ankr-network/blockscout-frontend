import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  periodSwitcherRoot: {
    height: 'auto',
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),

    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.02em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: '16px',
  },
}));
