import { makeStyles, Theme } from '@material-ui/core';

// TODO: VP provide theme here
export const useNumericStepperStyles = makeStyles<Theme>(theme => ({
  root: {
    '& $active': {
      color: '#fff',
    },
    '& $labelContainer': {
      color: 'red',
    },
    '& $disabled span:first-child div': {
      background: '#fff',
      border: '3px solid #E2E8F3',
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
