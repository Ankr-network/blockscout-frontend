import { makeStyles } from 'tss-react/mui';

const TAB_BORDER_RADIUS = 11;

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
  chainTypeTabs: {
    '&': {
      borderRadius: TAB_BORDER_RADIUS,
    },
  },
  groupTabs: {
    '&&': {
      borderRadius: TAB_BORDER_RADIUS,

      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
  },
  groupSelector: {
    '&&': {
      div: {
        borderRadius: 11,
      },

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
  },
}));
