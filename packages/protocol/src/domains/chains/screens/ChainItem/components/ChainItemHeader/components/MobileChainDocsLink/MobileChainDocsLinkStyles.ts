import { Theme, makeStyles } from '@material-ui/core';

export const useMobileChainDocsLinkStyles = makeStyles<Theme>(theme => ({
  button: {
    display: 'none',

    height: 'auto',
    padding: 0,

    letterSpacing: '0.01em',
    color: theme.palette.grey[600],

    fontWeight: 500,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,

    '&:hover': {
      backgroundColor: 'transparent',
    },

    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
}));
