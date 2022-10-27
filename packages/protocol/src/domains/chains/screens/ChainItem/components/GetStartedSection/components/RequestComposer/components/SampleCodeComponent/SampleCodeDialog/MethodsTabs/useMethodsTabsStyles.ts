import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMethodsTabsStyles = makeStyles<Theme>(theme => ({
  methodsTab: {
    padding: theme.spacing(2.75),

    '& > div': {
      backgroundColor: theme.palette.text.primary,
      borderRadius: 11,
      height: 32,
    },

    '& div div': {
      minWidth: 86,
      backgroundColor: theme.palette.text.primary,
      borderRadius: 11,
      padding: 2,
    },
  },
}));
