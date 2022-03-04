import { makeStyles } from '@material-ui/core';

// TODO: VP provide theme here
export const useNumericStepperStyles = makeStyles(theme => ({
  root: {
    '& $active': {
      color: theme.palette.common.white,
    },
    '& $labelContainer': {
      color: 'red',
    },
    '& $disabled span:first-child div': {
      background: theme.palette.common.white,
      border: '3px solid #E2E8F3',
    },
    '& > div > span': {
      position: 'relative',
    },
  },
  active: {},
  disabled: {},
  labelContainer: {},

  completeIcon: {
    '& svg': {
      fontSize: '33px',
    },
  },

  label: {
    '& span:first-child': {
      '& div': {
        width: 33,
        height: 33,
      },
    },

    '& span + span': {
      position: 'absolute',
      marginLeft: '12.5px',
    },
  },
}));
