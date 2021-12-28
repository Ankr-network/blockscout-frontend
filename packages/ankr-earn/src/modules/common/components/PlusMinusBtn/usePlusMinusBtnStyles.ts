import { makeStyles, Theme } from '@material-ui/core';

export const usePlusMinusBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 48,
    height: 48,
    minWidth: 48,
    padding: 0,
    background: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.default}`,
    color: theme.palette.text.secondary,
    borderRadius: '50%',

    '& svg': {
      color: 'inherit',
    },

    transition: '0.2s all',

    '&:hover': {
      background: theme.palette.background.paper,
      borderColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
  },
}));
