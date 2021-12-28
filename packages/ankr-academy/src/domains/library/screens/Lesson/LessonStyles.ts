import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useLessonStyles = makeStyles<Theme>(theme => ({
  root: {},
  container: {
    '&&': {
      maxWidth: `calc(604px + ${theme.spacing(4) * 2}px)`,
    },
  },
  title: {
    marginBottom: theme.spacing(6),
  },
}));
