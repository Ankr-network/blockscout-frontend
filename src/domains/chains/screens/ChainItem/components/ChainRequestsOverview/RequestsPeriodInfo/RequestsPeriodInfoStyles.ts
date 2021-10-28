import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    textAlign: 'center',
    cursor: 'pointer',
    opacity: 0.5,
    paddingTop: theme.spacing(3),
    transition: 'opacity 0.2s ease-in',
    width: '30%',
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  active: {
    opacity: 1,
    cursor: 'default',
    position: 'relative',

    '&:before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: 3,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
}));
