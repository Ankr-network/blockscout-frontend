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
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(2.5),
    borderBottom: `2px solid ${theme.palette.background.default}`,
  },
  rect: {
    marginLeft: theme.spacing(2),
  },
  right: {
    marginTop: theme.spacing(2),
    marginBottom: 10,
  },
  btnUnlock: {
    marginTop: theme.spacing(2),
  },
}));
