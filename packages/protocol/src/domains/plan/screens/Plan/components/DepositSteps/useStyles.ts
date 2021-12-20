import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
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
    borderRadius: 30,
  },
  stepper: {
    background: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 220,
    marginBottom: theme.spacing(4.5),
  },
  content: {
    marginBottom: theme.spacing(2.75),
    '& .icon': {
      verticalAlign: 'middle',
    },
  },
  notice: {
    fontWeight: 'lighter',
    marginBottom: theme.spacing(10.5),
  },
}));
