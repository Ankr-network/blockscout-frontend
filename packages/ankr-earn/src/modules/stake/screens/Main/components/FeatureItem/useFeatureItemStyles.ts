import { makeStyles, Theme } from '@material-ui/core';

export const useFeatureItemStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4),
  },

  icon: {
    display: 'block',
    marginBottom: theme.spacing(2),
    fontSize: 64,
  },
}));
