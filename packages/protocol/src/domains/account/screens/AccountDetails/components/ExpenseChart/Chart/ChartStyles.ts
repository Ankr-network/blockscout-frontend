import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(() => ({
  chartRoot: {
    padding: `20px 30px 20px 0`,
    borderRadius: 30,

    backgroundColor: '#ffffff',
  },
}));
