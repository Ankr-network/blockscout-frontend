import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.02em',

    fontWeight: 400,
    fontSize: 11,
    lineHeight: theme.spacing(2 * 2),

    '&:hover, &.Mui-focused': {
      '&&': {
        backgroundColor: theme.palette.background.paper,
      },
    },
  },
}));
