import { makeStyles } from '@material-ui/core';

export const useSwitcherStepperStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },

  step: {
    border: '3px solid #E2E8F3',
    borderRadius: '50%',
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 600,

    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: 33,
    width: 33,
  },

  approved: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,

    '& path': {
      stroke: theme.palette.common.white,
    },
  },

  line: {
    backgroundColor: '#E2E8F3',
    height: 3,
    width: 'calc(50% - 33px)',
  },
}));
