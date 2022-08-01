import { makeStyles } from '@material-ui/core';

export const useTableRowStyles = makeStyles(theme => ({
  tr: {
    height: 50,
    borderBottom: `1px solid ${theme.palette.background.default}`,

    '&:last-of-type': {
      borderBottom: `none`,
    },
  },

  td: {
    padding: theme.spacing(0, 2.5),
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  left: {
    textAlign: 'left',
  },

  right: {
    textAlign: 'right',
  },
}));
