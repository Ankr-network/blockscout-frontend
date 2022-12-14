import { makeStyles, Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(4),
    [`&.${ChainId.Harmony}`]: {
      border: `2px solid ${theme.palette.grey[300]}`,
    },
    [`&.${ChainId.Syscoin}`]: {
      borderRadius: 0,
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    [`&.${ChainId.Ethereum}`]: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: 0,
    },
    [`&.${ChainId.Secret}`]: {
      borderRadius: theme.spacing(1.25),
    },
    [`&.${ChainId.Klaytn}`]: {
      backgroundColor: theme.palette.grey[600],
      borderRadius: 0,
    },
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
}));
