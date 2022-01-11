import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useLessonStyles = makeStyles<Theme>(theme => ({
  root: {},
  containerLesson: {
    '&&': {},
  },
  title: {
    marginBottom: theme.spacing(6),
  },
  conainerNextLesson: {
    '&&': {},
  },
}));
