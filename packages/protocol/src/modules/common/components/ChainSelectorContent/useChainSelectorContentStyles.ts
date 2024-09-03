import { makeStyles } from 'tss-react/mui';

const TAB_BORDER_RADIUS = 11;

export const useChainSelectorContentStyles = makeStyles()(theme => ({
  controls: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    marginTop: theme.spacing(10),
    flexWrap: 'wrap',

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
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

    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
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

      [theme.breakpoints.down('xs')]: {
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

      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        width: '100%',
      },
    },
  },
  groupSelectorInput: {
    '&&': {
      [theme.breakpoints.down('xs')]: {
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

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      width: '100%',
    },
  },
  subchainLabelsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
}));
