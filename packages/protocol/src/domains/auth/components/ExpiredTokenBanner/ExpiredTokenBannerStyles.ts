import { makeStyles, Theme } from '@material-ui/core';

export const useExpiredTokenBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(3),

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
