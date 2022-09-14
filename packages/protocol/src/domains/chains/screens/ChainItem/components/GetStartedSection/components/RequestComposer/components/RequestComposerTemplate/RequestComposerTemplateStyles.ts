import { Theme, makeStyles } from '@material-ui/core';

export const useRequestComposerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(3.75),

    borderRadius: theme.spacing(3.75),

    backgroundColor: theme.palette.common.white,
  },
  container: {
    display: 'flex',
    gap: theme.spacing(3.5),
  },
}));
