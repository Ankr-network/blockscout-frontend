import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,

    '&.near': {
      background: `linear-gradient(269.89deg, #E9EEFB 0%, #EBDDDB 100%)`,
      color: theme.palette.text.primary,
    },
    '&.arbitrum': {
      background: '#222936',
    },
  },
  title: {
    '& span span': {
      fontWeight: 700,
    },
  },
  link: {
    fontWeight: 700,
    textDecoration: 'underline',
  },
}));
