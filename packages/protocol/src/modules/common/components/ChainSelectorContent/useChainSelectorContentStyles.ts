import { makeStyles } from 'tss-react/mui';

const TAB_BORDER_RADIUS = 11;

export const useChainSelectorContentStyles = makeStyles()(theme => ({
  controls: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    marginTop: theme.spacing(10),
    flexWrap: 'wrap',

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  labels: {
    marginTop: theme.spacing(4),
  },
  chainSeletorWrapper: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    marginRight: 'auto',
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
  groupSelectorAndProtocolSwitcherWrapper: {
    display: 'flex',
    gap: theme.spacing(3),
  },
  groupSelectorInner: {
    paddingLeft: 0,
    paddingRight: theme.spacing(3),
  },
  groupSelector: {
    '&&': {
      div: {
        borderRadius: 11,
      },

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: '100%',
      },
    },
  },
  groupSelectorInput: {
    '&&': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  title: {
    marginBottom: theme.spacing(5),

    letterSpacing: '-0.02em',

    fontWeight: 700,
    lineHeight: '135%',
  },
  additionalContent: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subchainLabelsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
}));
