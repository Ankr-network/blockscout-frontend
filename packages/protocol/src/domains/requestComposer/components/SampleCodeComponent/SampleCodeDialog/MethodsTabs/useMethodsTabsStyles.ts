import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMethodsTabsStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    methodsTab: {
      padding: theme.spacing(2 * 2.75),

      '& > div': {
        backgroundColor: isLightTheme
          ? theme.palette.grey[900]
          : theme.palette.background.default,
        borderRadius: 11,
        height: 40,
      },

      '& div div': {
        minWidth: 86,
        backgroundColor: isLightTheme
          ? theme.palette.grey[900]
          : theme.palette.background.default,
        borderRadius: 11,
      },
    },
  }),
);
