import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 2fr 1fr',
    alignItems: 'center',
    padding: theme.spacing(2.5, 5),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
