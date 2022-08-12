import { alpha, darken, makeStyles } from '@material-ui/core';

export const useProgressStepStyles = makeStyles(theme => ({
  root: {
    maxWidth: 730,
    padding: theme.spacing(6, 7),
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 4),
    },
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: theme.spacing(0, 0, 4),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 3),
    },
  },

  info: {
    fontSize: 16,
    lineHeight: '20.8px',
    textAlign: 'center',

    margin: theme.spacing(0, 0, 4),
  },

  link: {
    backgroundColor: 'inherit !important',

    marginBottom: 0,
    minWidth: 'inherit',
    padding: 0,
    height: 'inherit',
    width: 'inherit',
  },

  button: {
    width: '100%',

    '& + &': {
      marginTop: theme.spacing(3),
    },
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
}));
