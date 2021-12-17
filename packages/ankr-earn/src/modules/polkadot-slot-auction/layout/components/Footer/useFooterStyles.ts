import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useFooterStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(9, 0),
    boxSizing: 'border-box',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 0),
    },
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&&': {
      [theme.breakpoints.up('md')]: {
        display: 'grid',
        gap: theme.spacing(0, 1.5),
        gridTemplateColumns: '1fr auto 1fr',
      },
    },
  },

  copyright: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: 400,
    color: theme.palette.text.secondary,

    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },

    '& a:hover, a:focus': {
      color: theme.palette.text.primary,
    },
  },

  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2.5, 0, 0),
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  item: {
    marginRight: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(6.5),
    },

    '&:last-child': {
      marginRight: 0,
    },
  },

  link: {},

  active: {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
  },

  social: {
    marginTop: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      margin: 0,
      justifySelf: 'end',
    },
  },
}));
