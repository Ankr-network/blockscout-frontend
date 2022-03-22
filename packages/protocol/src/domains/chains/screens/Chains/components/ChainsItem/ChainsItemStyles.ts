import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BREAKPOINTS } from 'ui';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    cursor: 'pointer',

    '&:hover $button': {
      backgroundColor: theme.palette.background.default,
    },
  },
  mainInfo: {
    marginBottom: theme.spacing(2),
  },
  buttonsWrapper: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
  },
  buttonAddNetwork: {
    marginRight: theme.spacing(1),
  },
  button: {
    width: '100%',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  links: {
    width: '100%',
    '& $copyItem:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  copyItem: {},
  dummy: {
    background: theme.palette.background.default,
    minHeight: 36,
    borderRadius: 6,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  archive: {
    position: 'absolute',
    top: -2,
    right: 0,

    [theme.breakpoints.between(BREAKPOINTS.values.md, 850)]: {
      display: 'none',
    },
  },
}));
