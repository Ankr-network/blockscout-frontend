import { makeStyles } from 'tss-react/mui';

export const useNetworkSelectorStyles = makeStyles()(theme => ({
  root: {
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,

    backgroundColor: 'unset',
    background: 'unset',

    '&&': {
      margin: 0,
    },

    '&:before': {
      display: 'none',
    },

    '&:last-of-type': {
      borderRadius: 0,
    },
  },
  summaryRoot: {
    padding: 0,
  },
  summaryContent: {
    margin: 0,
  },
  summaryExpanded: {
    '&&': {
      minHeight: 'unset',
      margin: 0,
    },
  },
}));
