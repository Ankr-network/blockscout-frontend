import { makeStyles, Theme } from '@material-ui/core';

import checkboxChecked from './assets/checkbox-checked.svg';

export const useStyles = makeStyles<Theme>(theme => ({
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
