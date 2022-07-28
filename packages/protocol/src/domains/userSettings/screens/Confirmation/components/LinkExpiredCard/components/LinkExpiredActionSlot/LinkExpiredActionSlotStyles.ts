import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  buttonContainer: {
    display: 'flex',
    gridGap: theme.spacing(1.5),
  },
}));
