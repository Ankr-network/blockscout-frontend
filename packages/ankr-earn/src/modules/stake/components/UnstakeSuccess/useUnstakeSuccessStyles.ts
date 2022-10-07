import { alpha, darken, makeStyles, Theme } from '@material-ui/core';

export const useUnstakeSuccessStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    maxWidth: 728,
    margin: '0 auto',
    padding: theme.spacing(6, 3),
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    marginBottom: theme.spacing(3),
  },

  text: {
    fontSize: 16,
    marginBottom: theme.spacing(4),
  },

  btn: {
    width: '100%',
    borderRadius: 16,
  },

  link: {
    backgroundColor: 'inherit !important',

    marginBottom: 0,
    minWidth: 'inherit',
    padding: 0,
    height: 'inherit',
    width: 'inherit',
  },

  table: {
    marginBottom: theme.spacing(3),
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),

    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.4)}`,

    '&:last-child': {
      borderBottom: 'none',
    },
  },

  rowName: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    lineHeight: '17px',
    fontWeight: 'bold',
  },

  rowValue: {
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '17px',
  },

  navigation: {
    alignItems: 'center',
    display: 'flex',

    '& svg': {
      cursor: 'pointer',
      marginLeft: theme.spacing(1),

      '&:hover path, &:hover rect': {
        stroke: darken(theme.palette.text.secondary, 0.1),
      },
    },

    '& path, & rect': {
      stroke: theme.palette.text.secondary,
    },
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),

    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,

    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
