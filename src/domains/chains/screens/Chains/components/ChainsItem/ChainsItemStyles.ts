import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
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
  },
  links: {
    width: '100%',
    '& $copyItem:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  copyItem: {},
}));
