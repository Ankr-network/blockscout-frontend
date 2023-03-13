import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    border: `2px solid ${theme.palette.grey[300]}`,
    letterSpacing: '0.02em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: theme.spacing(2 * 2),

    '&&': {
      borderRadius: 11,
      color: theme.palette.grey[500],
    },

    '&:hover, &.Mui-focused': {
      '&&': {
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
  icon: {
    '&&': {
      color: theme.palette.grey[500],
    },
  },
}));
