import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMobileChainDocsLinkStyles = makeStyles()((theme: Theme) => ({
  button: {
    display: 'none',
    boxShadow: 'none',

    height: 'auto',
    padding: 0,

    letterSpacing: '0.01em',
    color: theme.palette.grey[600],

    fontWeight: 500,
    fontSize: theme.spacing(2 * 1.75),
    lineHeight: theme.spacing(2 * 2.5),

    '&:hover': {
      backgroundColor: 'transparent',
    },

    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
}));
