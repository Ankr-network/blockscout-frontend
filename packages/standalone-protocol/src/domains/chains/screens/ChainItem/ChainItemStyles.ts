import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MENU_WIDTH } from './components/CrossMenu/CrossMenuStyles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    '&.eth': {
      backgroundColor: theme.palette.common.white,
    },
  },
  main: {
    flexGrow: 1,
    position: 'relative',
    maxWidth: 1110,
    [theme.breakpoints.up('md')]: {
      paddingLeft: MENU_WIDTH + 24,
    },
  },
  header: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
  details: {
    marginTop: theme.spacing(6),
  },
  chart: {
    marginTop: theme.spacing(6),

    '&.arbitrum': {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    '&.iotex': {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    '&.avalanche': {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,
    },
  },
  nodes: {
    marginTop: theme.spacing(6),

    '&.arbitrum': {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    '&.iotex': {
      border: `1px solid ${theme.palette.grey['200']}`,
    },

    '&.avalanche': {
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.background.default}`,

      '& td, thead': {
        borderBottom: 'none',
      },

      '& tbody tr:nth-child(odd)': {
        background: theme.palette.grey['100'],
      },
    },

    '&.nervos': {
      '& thead': {
        borderBottom: `1px solid ${theme.palette.grey['200']}`,
      },

      '& tbody tr:not-last-child td': {
        borderBottom: `1px solid ${theme.palette.grey['200']}`,
      },
    },

    '&.secret': {
      '& thead': {
        borderColor: '#413F49',
      },
      '& tbody tr td': {
        borderColor: '#413F49',
      },
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
}));
