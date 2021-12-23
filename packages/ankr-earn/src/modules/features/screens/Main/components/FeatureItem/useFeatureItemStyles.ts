import { makeStyles, Theme } from '@material-ui/core';

export const useFeatureItemStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));
