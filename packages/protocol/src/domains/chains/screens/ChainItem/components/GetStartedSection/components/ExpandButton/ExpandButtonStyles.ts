import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  expandButton: {
    overflow: 'visible',
    '&&': {
      boxShadow: 'none',
    },

    height: 'auto',
    padding: 0,

    fontWeight: 600,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
