import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChainId } from 'domains/chains/api/chain';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    columnGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(3, 1fr)',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      rowGap: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },

    [`&.${ChainId.Ethereum} $block`]: {
      borderRadius: 0,
      backgroundColor: '#E5E5F5',
    },

    [`&.${ChainId.Harmony} $block`]: {
      border: `2px solid ${theme.palette.grey[300]}`,
    },

    [`&.${ChainId.Arbitrum} $block`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.IoTeX} $block`]: {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.Avalanche} $block`]: {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,
    },

    [`&.${ChainId.Nervos} $block`]: {
      borderRadius: 0,
      position: 'relative',

      '&:not(:last-of-type):after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: 1,
        height: '100%',
        background: theme.palette.grey['200'],
        top: 0,
        right: -16,

        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },

    [`&.${ChainId.Syscoin} $block`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.grey['200'],
    },

    [`&.${ChainId.Secret} $block`]: {
      borderRadius: theme.spacing(1.25),
      border: `2px solid ${theme.palette.grey[300]}`,
    },

    [`&.${ChainId.Filecoin} $block`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.light,
    },

    [`&.${ChainId.Klaytn} $block`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.light,
    },
  },

  block: {},
}));
