import { alpha, makeStyles } from '@material-ui/core';

export const useApprovalFormButtonsStyles = makeStyles(theme => ({
  stepperLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginRight: theme.spacing(1),
    height: theme.spacing(3),
    width: theme.spacing(3),

    borderRadius: '100%',
    border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
    color: theme.palette.common.white,
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
