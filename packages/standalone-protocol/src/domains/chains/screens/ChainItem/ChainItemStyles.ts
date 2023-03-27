import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChainId } from 'domains/chains/api/chain';
import { MENU_WIDTH } from './components/CrossMenu/CrossMenuStyles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',

    [`&.${ChainId.Ethereum}`]: {
      backgroundColor: theme.palette.common.white,
    },

    [`&.${ChainId.Filecoin}`]: {
      backgroundColor: theme.palette.common.white,
    },
  },
  menu: {
    height: 0,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  main: {
    maxWidth: 1110,
    [theme.breakpoints.up('md')]: {
      paddingLeft: `${MENU_WIDTH + 24}px !important`,
    },
  },
  details: {
    marginTop: theme.spacing(3),
  },
  chart: {
    marginTop: theme.spacing(6),

    [`&.${ChainId.Arbitrum}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.IoTeX}`]: {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.Avalanche}`]: {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,
    },

    [`&.${ChainId.Filecoin}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.grey[700],
    },
  },
  nodes: {
    marginTop: theme.spacing(6),

    [`&.${ChainId.Arbitrum}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.IoTeX}`]: {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.Avalanche}`]: {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,

      '& td, thead': {
        borderBottom: 'none',
      },

      '& tbody tr:nth-child(odd)': {
        background: theme.palette.grey['100'],
      },
    },

    [`&.${ChainId.Nervos}`]: {
      '& thead': {
        borderBottom: `1px solid ${theme.palette.grey['200']}`,
      },

      '& tbody tr:not-last-child td': {
        borderBottom: `1px solid ${theme.palette.grey['200']}`,
      },
    },

    [`&.${ChainId.Secret}`]: {
      '& thead': {
        borderColor: '#413F49',
      },
      '& tbody tr td': {
        borderColor: '#413F49',
      },
    },

    [`&.${ChainId.Filecoin}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.grey[700],
    },
  },
  spinner: {
    minHeight: 120,
    position: 'relative',
    marginTop: theme.spacing(6),

    '& svg': {
      maxWidth: 80,
    },
  },
  zkEvmText: {
    margin: theme.spacing(3, 0),
    textAlign: 'center',

    '& b': {
      color: theme.palette.primary.main,
    },
  },
}));
