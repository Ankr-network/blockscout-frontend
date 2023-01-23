import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderStyles = makeStyles<boolean>()(
  (theme: Theme, shouldOnlyShowMobileSelector: boolean) => ({
    chainItemHeader: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2 * 3.75),

      marginBottom: theme.spacing(2 * 7.5),
      padding: theme.spacing(2 * 3.75),

      borderRadius: theme.spacing(2 * 3.75),

      background: theme.palette.background.paper,
    },
    controls: {
      display: 'flex',
      gap: theme.spacing(2 * 1.5),
      alignItems: 'flex-start',

      flexDirection: shouldOnlyShowMobileSelector ? 'column' : undefined,

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    desktopGroupSelector: {
      '&&': {
        display: shouldOnlyShowMobileSelector ? 'none' : undefined,

        [theme.breakpoints.down('md')]: {
          display: 'none !important',
        },
      },
    },
    mobileGroupSelector: {
      '&&': {
        display: shouldOnlyShowMobileSelector ? 'flex' : 'none',

        [theme.breakpoints.down('md')]: {
          display: 'flex',
        },
      },
    },
  }),
);
