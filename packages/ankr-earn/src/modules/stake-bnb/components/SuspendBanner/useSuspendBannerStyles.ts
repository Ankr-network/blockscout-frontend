import { makeStyles } from '@material-ui/core';

export const useSuspendBannerStyles = makeStyles(theme => ({
  banner: {
    padding: theme.spacing(1.75, 2.25),
  },

  icon: {
    display: 'block',
    fontSize: 20,
    widht: '1em',
    height: '1em',
    margin: theme.spacing(1.25, 1, 0, 0),
  },

  paragraph: {
    fontSize: 14,
    fontWeight: 400,

    '& a': {
      color: theme.palette.primary.main,
      wordBreak: 'break-word',

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
