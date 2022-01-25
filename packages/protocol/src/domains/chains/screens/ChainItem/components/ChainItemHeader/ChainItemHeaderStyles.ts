import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2.5, 3.5),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.background.default}`,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  left: {
    width: '49%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      paddingBottom: theme.spacing(2.5),
      borderBottom: `2px solid ${theme.palette.background.default}`,
      marginBottom: theme.spacing(2.5),
    },
  },
  tooltip: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  text: {
    fontWeight: 600,
  },
  textPublic: {
    marginBottom: theme.spacing(2),
  },
  bottom: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  btnUnlock: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  right: {
    width: '49%',

    '& $copyToClip:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  copyToClip: {
    minWidth: 330,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  description: {
    display: 'flex',
  },
  archived: {
    marginLeft: theme.spacing(1),
    borderRadius: 6,
    lineHeight: 1,
    padding: '4px 6px',
    background: theme.palette.background.default,
    cursor: 'pointer',
  },
  preloaderWrapper: {
    minHeight: 120,
    position: 'relative',
  },
}));
