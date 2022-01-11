import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useLessonCardStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 400,
    overflow: 'hidden',
  },
  lessonIndex: {},
  lessonTitle: {},
  timeToRead: {},
  btn: {
    marginTop: 'auto',
    position: 'relative',
  },
  imgPreview: {
    maxWidth: '50%',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
}));
