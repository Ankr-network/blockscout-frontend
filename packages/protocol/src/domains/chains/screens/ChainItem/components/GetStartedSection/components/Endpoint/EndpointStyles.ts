import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useEndpointStyles = makeStyles()((theme: Theme) => ({
  endpoint: {
    display: 'flex',
    gap: theme.spacing(2 * 1.5),
  },
  copyToClip: {
    flexGrow: 1,

    height: theme.spacing(2 * 6),

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2 * 2),

    boxShadow: 'none',
  },
  addNetworkButton: {
    minWidth: 'auto',
    whiteSpace: 'nowrap',
    padding: theme.spacing(0, 2 * 1.5),
    '&&': {
      backgroundColor: theme.palette.background.paper,
    },
    display: 'flex',
    borderRadius: theme.spacing(2 * 2),

    '&:hover': {
      '&&': {
        backgroundColor: theme.palette.background.default,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      '&&': {
        padding: theme.spacing(2 * 1.5, 2 * 3),
      },
    },
  },
}));