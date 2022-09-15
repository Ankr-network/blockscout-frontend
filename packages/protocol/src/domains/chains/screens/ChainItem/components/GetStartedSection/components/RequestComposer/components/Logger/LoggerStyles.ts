import { Theme, makeStyles } from '@material-ui/core';

export const useLoggerStyles = makeStyles<Theme>(theme => ({
  logger: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.5),

    height: theme.spacing(75.5),
    padding: theme.spacing(3.5, 0, 3.5),

    borderRadius: theme.spacing(2.5),

    background: theme.palette.grey[700],
    width: '60%',
  },
}));
