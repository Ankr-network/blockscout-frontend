import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
}));
