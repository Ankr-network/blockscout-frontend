import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  button: {
    fontSize: 16,
    paddingRight: 0,
    background: 'transparent',
    height: 'auto',
    padding: 0,

    '&:hover': {
      background: 'transparent',

      '& $plusIcon': {
        fill: theme.palette.text.primary,
      },
    },

    '&.Mui-disabled $plusIcon': {
      fill: theme.palette.text.disabled,
    },
  },
  plusIcon: {
    width: 14,
    height: 14,
    fill: theme.palette.primary.main,
  },
}));
