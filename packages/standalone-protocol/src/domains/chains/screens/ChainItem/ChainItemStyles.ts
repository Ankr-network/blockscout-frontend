import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ChainId } from 'domains/chains/api/chain';

import { MENU_WIDTH } from './components/CrossMenu/CrossMenuStyles';
import tenetBackground from './assets/tenetBackground.png';

const MAX_WIDTH = 1110;

// eslint-disable-next-line max-lines-per-function
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
  container: {
    [`&.${ChainId.Tenet}`]: {
      backgroundImage: `url(${tenetBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `calc(50% + ${MAX_WIDTH / 2}px) 20%`,

      [theme.breakpoints.down('md')]: {
        backgroundPosition: '200% 20%',
      },

      [theme.breakpoints.down(760)]: {
        backgroundPosition: '320% 20%',
      },

      [theme.breakpoints.down(700)]: {
        backgroundPosition: '5px 20%',
      },
    },
  },
  main: {
    maxWidth: MAX_WIDTH,

    [theme.breakpoints.up('md')]: {
      paddingLeft: `${MENU_WIDTH + 24}px !important`,
    },
  },
  details: {
    marginTop: theme.spacing(3),
  },
  chart: {
    marginTop: theme.spacing(6),

    [`&.${ChainId.Core}`]: {
      backgroundColor: theme.palette.grey[100],
    },

    [`&.${ChainId.Arbitrum}`]: {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    [`&.${ChainId.Chiliz}`]: {
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

    [`&.${ChainId.Scroll}`]: {
      border: `1px solid ${theme.palette.primary.light}`,
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

    [`&.${ChainId.Core}`]: {
      backgroundColor: theme.palette.grey[100],
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

    [`&.${ChainId.Scroll}`]: {
      border: `1px solid ${theme.palette.primary.light}`,
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

    '& a': {
      color: theme.palette.primary.main,
    },
  },
}));
