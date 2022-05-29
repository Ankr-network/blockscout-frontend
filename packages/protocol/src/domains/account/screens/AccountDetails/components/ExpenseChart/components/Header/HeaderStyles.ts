import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 15,
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1.25),
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: 17,
    lineHeight: `${theme.spacing(3)}px`,
  },
  currency: {
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
