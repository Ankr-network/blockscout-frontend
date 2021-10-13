import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 15,
    marginBottom: theme.spacing(4),
    padding: theme.spacing(7.5, 2.5, 2),
    position: 'relative',
  },
  text: {
    textAlign: 'center',
  },
  link: {
    marginTop: theme.spacing(0.5),
    whiteSpace: 'nowrap',
    background: 'transparent',
  },
  icon: {
    fontSize: 9,
  },
  image: {
    position: 'absolute',
    maxWidth: 84,
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',

    '& img': {
      width: '100%',
    },
  },
}));
