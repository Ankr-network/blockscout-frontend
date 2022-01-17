import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useExamQuestionsStyles = makeStyles<Theme>(theme => ({
  question: {
    marginBottom: theme.spacing(2),
  },
}));
