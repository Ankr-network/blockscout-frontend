import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core';
import { FONTS } from 'ui';

export const useSubMenuStyles = makeStyles<Theme>(theme => ({
  component: {},

  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    margin: 0,
    marginTop: theme.spacing(2),
    padding: 0,

    listStyle: 'none',
  },

  item: {
    width: '100%',
  },

  link: {
    '&&, &:focus': {
      display: 'inline-block',
      width: 'auto',
      color: alpha(theme.palette.text.primary, 0.5),
      fontFamily: FONTS.primary,
      textTransform: 'inherit',
      justifyContent: 'flex-start',
      transitionDuration: '300ms',
      transitionProperty: 'color',
      transitionTimingFunction: 'linear',
      padding: theme.spacing(1.25, 0),
      fontSize: 18,
      textDecoration: 'none',

      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },

      '&:hover': {
        color: theme.palette.primary.main,
        transitionDuration: '200ms',
      },
    },
  },

  activeLink: {
    '&&, &:focus': {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
}));
