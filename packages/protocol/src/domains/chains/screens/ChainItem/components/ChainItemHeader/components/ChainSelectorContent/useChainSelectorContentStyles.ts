import { makeStyles } from 'tss-react/mui';

export const useChainSelectorContentStyles = makeStyles()(theme => ({
  controls: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',

    marginTop: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(7.5),
    },
  },
  selectors: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
  },
  desktopGroupSelector: {
    '&&': {
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
  },
  rootMobileGroupSelector: {
    '&&': {
      display: 'none',

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
  },
}));
