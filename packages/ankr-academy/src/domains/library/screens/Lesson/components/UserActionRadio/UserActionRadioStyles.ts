import { makeStyles } from '@material-ui/styles';
import { lighten, Theme } from '@material-ui/core';

export const useUserActionRadioStyles = makeStyles<Theme>(theme => ({
  formWrapper: {
    padding: theme.spacing(3.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 28,
  },
  formControl: {
    width: '100%',
  },
  legend: {
    marginBottom: theme.spacing(3),
  },
  controlWrapper: {
    padding: `0 ${theme.spacing(2)}px`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    backgroundColor: lighten(theme.palette.primary.main, 0.9),

    '&+&': {
      marginTop: theme.spacing(0.5),
    },
  },
  controlWrapperSuccess: {
    border: `1px solid ${theme.palette.success.main}`,
    backgroundColor: theme.palette.success.light,
  },
  controlWrapperError: {
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.light,
  },
  radioButton: {
    marginRight: theme.spacing(1),
  },
  radioButtonError: {
    '&&': {
      /* is used for radio icon currentColor */
      color: theme.palette.error.main,
    },
  },
  radioButtonSuccess: {
    '&&': {
      /* is used for radio icon currentColor */
      color: theme.palette.success.main,
    },
  },
  label: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  radioStatus: {
    marginTop: -theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft: 38,
  },
  radioStatusSuccess: {
    color: theme.palette.success.main,
  },
  radioStatusError: {
    color: theme.palette.error.main,
  },
}));
