import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  snippets: {
    overflow: 'hidden',

    display: 'flex',
    gap: theme.spacing(3.75),

    padding: theme.spacing(3, 3.75),

    borderRadius: theme.spacing(3.75),

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
