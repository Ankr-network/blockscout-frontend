import { makeStyles, Theme } from '@material-ui/core';

export const useButtonsItemStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: theme.palette.text.primary,
  },

  button: {
    marginLeft: theme.spacing(1),
  },

  blueChip: {
    backgroundColor: 'rgba(53, 109, 243, 0.1)',
    color: theme.palette.primary.main,
    borderRadius: '8px',
  },

  greyChip: {
    borderRadius: '8px',
  },
}));
