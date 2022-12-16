import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChainId } from 'domains/chains/api/chain';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    height: 72,
    paddingTop: '0!important',
  },
  top: {
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing(2.5),
    },

    [`&.${ChainId.Nervos}`]: {
      maxWidth: 'calc(100% - 72px - 16px)',
    },
  },
  copyButton: {
    flexGrow: 1,
  },
  addNetworkButton: {
    marginLeft: `${theme.spacing(2)}px !important`,

    [`&.${ChainId.Gnosis}`]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 9,
    },

    [`&.${ChainId.Klaytn}`]: {
      border: `2px solid ${theme.palette.grey[300]}`,
      borderRadius: 0,
    },
  },
  link: {
    width: '100%',
    display: 'flex',
    minHeight: 72,
  },
  label: {
    color: theme.palette.grey['500'],
    marginTop: 6,
  },
}));
