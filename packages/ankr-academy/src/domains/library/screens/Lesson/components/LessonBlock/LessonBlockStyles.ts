import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useLessonBlockStyles = makeStyles<Theme>(theme => ({
  root: {},
  imgMessage: {
    display: 'block',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(1),
  },
}));
