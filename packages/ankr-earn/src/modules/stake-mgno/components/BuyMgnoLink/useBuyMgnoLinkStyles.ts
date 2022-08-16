import { makeStyles } from '@material-ui/core';

export const useBuyMgnoLinkStyles = makeStyles(theme => {
  return {
    balanceLink: {
      height: 'auto',
      fontSize: 12,
      padding: 0,
      marginLeft: theme.spacing(1),
      fontWeight: 400,
      transition: 'color 0.2s',

      '&:hover': {
        background: 'none',
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  };
});
