import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(2.5, 3.5),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.background.paper}`,
    paddingBottom: theme.spacing(3),
  },
  copyToClip: {
    minWidth: 360,
  },
  text: {
    fontWeight: 600,
  },
  description: {
    color: theme.palette.text.secondary,
  },
  bottom: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
