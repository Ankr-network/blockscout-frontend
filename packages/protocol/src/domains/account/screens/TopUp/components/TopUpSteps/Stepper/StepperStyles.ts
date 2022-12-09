import { Theme, StepConnector, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    '&.Mui-error': {
      '& div': {
        background: theme.palette.warning.main,
      },
    },
  },
}));

export const Connector = withStyles({
  completed: {
    background: '#EEA941',
  },
})(StepConnector);
