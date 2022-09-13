import { Theme, makeStyles } from '@material-ui/core';

export const useConsoleStyles = makeStyles<Theme>(theme => ({
  console: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.5),

    padding: theme.spacing(0, 3.5),
  },
}));
