import { alpha, makeStyles } from '@material-ui/core';

export const useApprovalFormButtonsStyles = makeStyles(theme => ({
  stepperLabel: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: '100%',
    border: `1.5px solid ${alpha(theme.palette.common.white, 0.3)}`,
    lineHeight: 1.42,
    textAlign: 'center',
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
    fontWeight: 600,
    fontSize: 14,
  },

  stepperLabelDisabled: {
    borderColor: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
    fontSize: 14,
  },

  approvalSettings: {
    width: '100%',
    padding: theme.spacing(1.5, 0, 0),

    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.23,
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5, 0),
    },
  },

  questionBtnActive: {
    color: theme.palette.common.white,
  },

  questionBtnDisabled: {
    color: 'inherit',
  },
}));
