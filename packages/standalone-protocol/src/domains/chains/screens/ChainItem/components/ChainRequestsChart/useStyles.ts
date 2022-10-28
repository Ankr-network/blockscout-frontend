import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(4),
    '&.harmony': {
      border: `2px solid ${theme.palette.grey[300]}`,
    },
    '&.syscoin': {
      borderRadius: 0,
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    '&.eth': {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: 0,
    },
    '&.klaytn': {
      backgroundColor: theme.palette.grey[600],
      borderRadius: 0,
    },
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
}));
