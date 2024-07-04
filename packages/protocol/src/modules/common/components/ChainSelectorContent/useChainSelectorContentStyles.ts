import { makeStyles } from 'tss-react/mui';

const TAB_BORDER_RADIUS = 11;

export const useChainSelectorContentStyles = makeStyles()(theme => ({
  controls: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.background.default}`,
    marginTop: theme.spacing(10),
    flexWrap: 'wrap',

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
    flexGrow: 1,
  },
}));
