import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  switcherRoot: {
    minHeight: 24,
    height: 24,
    minWidth: 'auto',
    padding: theme.spacing(1, 2),
    borderRadius: 18,

    '&&': {
      border: `2px solid ${theme.palette.background.default}`,
    },

    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 500,
    fontSize: 11,
    lineHeight: theme.spacing(2 * 2),

    '&.Mui-disabled': {
      boxShadow: 'none',
      border: `1px solid ${theme.palette.action.disabledBackground}`,
      backgroundColor: 'transparent',
      color: theme.palette.grey[600],
    },
  },
}));
