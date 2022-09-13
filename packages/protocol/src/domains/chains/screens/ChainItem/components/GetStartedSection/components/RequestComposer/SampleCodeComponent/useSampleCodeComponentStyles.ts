import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSampleCodeComponentStyles = makeStyles<Theme>(theme => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));
