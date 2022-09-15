import { makeStyles } from '@material-ui/core';

export const useTokensTableStyles = makeStyles(theme => ({
  head: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'block',
      padding: theme.spacing(0, 3),
      marginBottom: theme.spacing(2),
    },
  },

  headText: {
    fontSize: 13,
    fontWeight: 500,
  },

  body: {
    display: 'grid',
    gap: theme.spacing(2, 0),
  },

  row: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, -2),
      gap: 0,
    },
  },

  item: {
    position: 'relative',
    padding: theme.spacing(2, 2.5),
    minWidth: 0,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.75, 3),
      borderRadius: 12,
    },
  },

  col: {
    width: '100%',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2),
      flex: '0 0 auto',
      marginBottom: 0,

      '&:nth-child(1)': {
        width: '22%',
      },

      '&:nth-child(2)': {
        width: '30%',
      },

      '&:nth-child(3)': {
        width: '28%',
      },

      '&:nth-child(4)': {
        width: '20%',
      },
    },
  },

  colXsBordered: {
    display: 'grid',
    gridTemplateColumns: '0.4fr 0.6fr',
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #E2E8F3',

    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginBottom: 0,
      paddingBottom: 0,
      border: 'none',
    },

    '&:last-child': {
      marginBottom: 0,
      paddingBottom: 0,
      border: 'none',
    },
  },

  text: {
    textAlign: 'right',
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },

  textSecondary: {
    fontSize: 12,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  textField: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 130,
    },
  },

  textFieldSkeleton: {
    borderRadius: 12,
  },

  input: {
    minHeight: 44,
    padding: theme.spacing(1, 2),
  },

  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),

    width: 32,
    height: 32,

    color: theme.palette.text.secondary,
    fontSize: 10,

    transition: 'all 0.2s',

    [theme.breakpoints.up('md')]: {
      top: 0,
      right: 0,
      opacity: 0,
      transform: 'scale(0.7)',
    },

    '&:hover': {
      color: theme.palette.text.primary,
    },

    '$item:hover &': {
      [theme.breakpoints.up('md')]: {
        opacity: 1,
        transform: 'none',
      },
    },
  },
}));
