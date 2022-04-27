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
    height: 486,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepper: {
    background: 'transparent',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    maxWidth: 220,
    marginBottom: theme.spacing(4.5),
  },
  title: {
    marginBottom: theme.spacing(2.75),
    minHeight: 110,

    '&.h3': {
      fontSize: 28,
    },

    '& .icon': {
      verticalAlign: 'middle',
    },
  },
  notice: {
    fontWeight: 'lighter',
    minHeight: 45,
    marginBottom: theme.spacing(3),
  },
}));
