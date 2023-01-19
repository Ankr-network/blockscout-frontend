import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMethodsTabsStyles = makeStyles()((theme: Theme) => ({
  methodsTab: {
    padding: theme.spacing(2 * 2.75),

    '& > div': {
      backgroundColor: theme.palette.grey[900],
      borderRadius: 11,
      height: 40,
    },

    '& div div': {
      minWidth: 86,
      backgroundColor: theme.palette.grey[900],
      borderRadius: 11,
    },
  },
}));
