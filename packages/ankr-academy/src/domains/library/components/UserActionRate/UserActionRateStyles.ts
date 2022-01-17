import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useUserActionRateStyles = makeStyles<Theme>(theme => ({
  userActionRateRoot: {
    padding: theme.spacing(3.5),
  },
  legend: {
    marginBottom: theme.spacing(3.5),
  },
  formControl: {
    width: '100%',
    textAlign: 'center',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlLabel: {
    margin: 0,
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  radio: {
    padding: 0,
  },
  rateIcon: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.background.default}`,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 52,
      padding: theme.spacing(0.8),
    },
  },
  rateIconSelected: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
