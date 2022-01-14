import { makeStyles } from '@material-ui/styles';
import { lighten, Theme } from '@material-ui/core';

export const useUserActionQuestionStyles = makeStyles<Theme>(theme => ({
  formWrapper: {},
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
    backgroundColor: theme.palette.background.default,
    border: `1px solid transparent`,
    transition: 'background-color .3s, border-color .3s',

    '&+&': {
      marginTop: theme.spacing(0.5),
    },
  },
  controlWrapperActive: {
    borderColor: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.main, 0.9),
  },
  controlWrapperSuccess: {
    borderColor: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
  },
  controlWrapperError: {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.light,
  },
  controlButton: {
    marginRight: theme.spacing(1),
  },
  controlButtonActive: {
    '&&': {
      /* is used for control icon currentColor */
      color: theme.palette.primary.main,
    },
  },
  controlButtonError: {
    '&&': {
      /* is used for control icon currentColor */
      color: theme.palette.error.main,
    },
  },
  controlButtonSuccess: {
    '&&': {
      /* is used for control icon currentColor */
      color: theme.palette.success.main,
    },
  },
  label: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  controlStatus: {
    marginTop: -theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft: 38,
  },
  controlStatusSuccess: {
    color: theme.palette.success.main,
  },
  controlStatusError: {
    color: theme.palette.error.main,
  },

  /* UserActionCheckbox styles */
  btnSubmit: {
    marginTop: theme.spacing(3.5),
    alignSelf: 'flex-start',
  },
}));
