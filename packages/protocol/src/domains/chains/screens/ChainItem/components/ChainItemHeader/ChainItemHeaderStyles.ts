import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderStyles = makeStyles()((theme: Theme) => ({
  chainItemHeader: {
    marginBottom: theme.spacing(2 * 7.5),
    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    background: theme.palette.background.paper,
  },
}));

export const useChainItemHeaderContentStyles = makeStyles<boolean>()(
  (theme: Theme, shouldOnlyShowMobileSelector: boolean) => ({
    controls: {
      display: 'flex',
      gap: theme.spacing(2 * 1.5),
      alignItems: 'flex-start',
      marginTop: theme.spacing(8),

      flexDirection: shouldOnlyShowMobileSelector ? 'column' : undefined,

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(2 * 3.75),
      },
    },
    desktopGroupSelector: {
      '&&': {
        display: shouldOnlyShowMobileSelector ? 'none' : undefined,

        [theme.breakpoints.down('sm')]: {
          display: 'none !important',
        },
      },
    },
    rootMobileGroupSelector: {
      '&&': {
        marginBottom: theme.spacing(8),
      },
    },
    mobileGroupSelector: {
      '&&': {
        display: shouldOnlyShowMobileSelector ? 'flex' : 'none',

        [theme.breakpoints.down('sm')]: {
          display: 'flex',
        },
      },
    },
    content: {
      display: 'flex',
      alignItems: 'stretch',
      alignContent: 'center',
      justifyContent: 'center',
      gap: theme.spacing(7.5),

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  }),
);
