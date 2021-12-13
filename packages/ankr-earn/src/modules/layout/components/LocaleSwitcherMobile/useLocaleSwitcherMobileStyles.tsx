import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.palette.text.secondary,
    display: 'flex',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsWrapper: {
    marginRight: theme.spacing(-1.25),
  },
  button: {
    background: 'none',
    transition: 'color 0.2s',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.25),
    fontWeight: 400,
    minWidth: 0,

    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },
  },
  activeButton: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));
