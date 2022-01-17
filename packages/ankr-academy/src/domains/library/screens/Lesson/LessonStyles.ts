import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useLessonStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: theme.spacing(6),
  },
}));
