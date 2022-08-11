import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  getStartedContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    paddingTop: theme.spacing(3.75),
  },
}));
