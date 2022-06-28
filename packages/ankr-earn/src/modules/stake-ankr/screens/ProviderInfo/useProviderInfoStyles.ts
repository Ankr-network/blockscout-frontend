import { darken, makeStyles } from '@material-ui/core';

export const useProviderInfoStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 4),
      marginBottom: theme.spacing(2),
    },
  },

  icon: {
    width: 20,
    padding: 0,
    marginLeft: theme.spacing(2),
    minWidth: 0,
  },

  link: {
    backgroundColor: 'inherit',
    marginBottom: 0,
    minWidth: 'inherit',
    padding: 0,
    height: 'inherit',
    width: 'inherit',
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },

  addressRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(2, 0, 1),
  },

  btn: {
    height: 50,
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  },

  statsText: {
    '& > p': {
      fontSize: 14,
    },
  },

  addressWrappes: {
    display: 'flex',
    width: '100%',
    height: 50,
    lineHeight: 17,
    marginRight: theme.spacing(3),
    padding: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,

    '& svg': {
      cursor: 'pointer',
      marginLeft: theme.spacing(1),
      height: 20,
      width: 20,

      '&:hover path, &:hover rect': {
        stroke: darken(theme.palette.text.secondary, 0.1),
      },
    },

    '& path, & rect': {
      stroke: theme.palette.text.secondary,
    },
  },

  tokenAddress: {
    fontSize: 14,
    fontWeight: 400,
  },

  addressBtns: {
    display: 'flex',
    alignItems: 'center',
  },
}));
