import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core';
import { FONTS } from 'ui';

export const usePrivacyStyles = makeStyles<Theme>(theme => ({
  inner: {
    padding: theme.spacing(3, 0),
    borderTop: `2px solid ${theme.palette.background.default}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  logo: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      width: '25%',
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3),
    },
  },

  copyright: {
    flexGrow: 1,
    color: alpha(theme.palette.text.primary, 0.5),
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 0.2s',
      '&:hover, &:focus': {
        color: theme.palette.text.secondary,
      },
    },
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: theme.spacing(2),
    },
  },

  item: {
    marginRight: theme.spacing(6),
    '&:last-child': {
      margin: 0,
    },
    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(3),
    },
  },

  link: {
    '&&': {
      fontFamily: FONTS.primary,
      fontSize: 15,
      padding: theme.spacing(1, 0),
      color: alpha(theme.palette.text.primary, 0.4),
      textTransform: 'inherit',
      transition: 'color 0.2s',
      '&:hover, &:focus': {
        color: theme.palette.text.secondary,
        transitionDuration: '200ms',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
  },
}));
