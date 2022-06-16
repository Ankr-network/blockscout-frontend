import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  connectionSnippet: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));
