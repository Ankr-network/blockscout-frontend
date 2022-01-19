import { makeStyles, Theme } from '@material-ui/core';

export const usePendingTableStyles = makeStyles<Theme>(theme => ({
  table: {
    borderCollapse: 'collapse',
  },

  tr: {
    '&:first-child $td': {
      border: 'none',
    },

    '&:last-child $td': {
      paddingBottom: theme.spacing(1),
    },
  },

  tCell: {
    padding: theme.spacing(1.5, 2.5),
    lineHeight: 1.2,

    '&:first-child': {
      paddingLeft: 0,
    },

    '&:last-child': {
      paddingRight: 0,
    },
  },

  th: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },

  td: {
    fontSize: 12,
    borderTop: `2px solid ${theme.palette.background.default}`,
  },
}));
