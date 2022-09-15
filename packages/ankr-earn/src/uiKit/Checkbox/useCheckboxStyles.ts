import { makeStyles } from '@material-ui/core';

import checkedIcon from '../Icons/CheckedIcon.svg';

import checkboxChecked from './assets/checkbox-checked.svg';

// TODO: VP provide under theme
export const useStyles = makeStyles(theme => ({
  labelActive: {
    fontSize: '14px',
    color: '#356DF3',
  },
  label: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
  },
  labelDisabled: {
    color: '#BFC6D0',
  },
  checkbox: {
    '& input': {
      width: 22,
      height: 22,
    },
    '& input:checked + span': {
      border: '2px solid #356DF3',
    },
    '& input:disabled + span': {
      background: '#E2E8F3',
      border: '2px solid #E2E8F3',
    },
    '& input + span': {
      width: 22,
      height: 22,
      borderRadius: '6px',
      border: '2px solid #BFC6D0',
      '&:before': {
        width: 22,
        height: 22,
        top: '3px',
        left: '2px',
        backgroundImage: `url(${checkedIcon})`,
      },
    },
  },
  icon: {
    borderRadius: 5,
    width: 16,
    height: 16,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,

    'input:hover ~ &': {
      border: `2px solid ${theme.palette.primary.dark}`,
    },
    'input:disabled ~ &': {
      borderColor: theme.palette.action.disabledBackground,
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,

    '&:before': {
      display: 'block',
      width: 12,
      height: 10,
      backgroundImage: `url(${checkboxChecked})`,
      content: '""',

      position: 'relative',
      top: 1,
      backgroundRepeat: 'no-repeat',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
