import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  main: {
    flexGrow: 1,
    position: 'relative',
    maxWidth: 1110,
  },
  header: {
    marginTop: theme.spacing(5),
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
