import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useLoaderStyles = makeStyles<Theme>(theme => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: theme.palette.common.white,
    padding: 40,
    maxWidth: 480,
    minHeight: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  spinnerContainer: {
    position: 'relative',
    marginTop: theme.spacing(4.5),
  },
}));
