import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  chip: {
    height: '28px',
    borderRadius: '12px',
    fontSize: 13,
    backgroundColor: theme.palette.error.light,
    borderColor: 'transparent',
    color: theme.palette.error.main,
  },
}));
