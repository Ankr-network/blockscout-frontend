import { makeStyles, Theme } from '@material-ui/core';

export const HEADER_HEIGHT = 121;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 0),
    color: theme.palette.text.primary,
  },
  rootText: {
    fontSize: '19px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  links: {
    fontSize: '16px',
    margin: theme.spacing(0, 2),
    textAlign: 'center',

    '&.arbitrum, &.near, &.avalanche': {
      color: theme.palette.grey['500'],

      '& $link': {
        color: theme.palette.common.black,
      },
    },

    '&.solana,  &.nervos': {
      color: theme.palette.grey['500'],

      '& $link': {
        color: theme.palette.common.white,
      },
    },
  },
  link: {
    textDecoration: 'underline',
  },
  heart: {
    width: 14,
    position: 'relative',
    top: 1,
    margin: '0 2px',
  },
}));
