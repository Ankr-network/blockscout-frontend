import { Theme, makeStyles } from '@material-ui/core/styles';

export const useEndpointStyles = makeStyles<Theme>(theme => ({
  endpoint: {
    display: 'flex',
    gap: theme.spacing(1.5),
  },
  copyToClip: {
    flexGrow: 1,

    height: theme.spacing(6),

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2),

    boxShadow: 'none',
  },
  addNetworkButton: {
    backgroundColor: `${theme.palette.common.white} !important`,
    borderRadius: theme.spacing(2),

    '&:hover': {
      backgroundColor: `${theme.palette.background.default} !important`,
    },

    [theme.breakpoints.up('md')]: {
      flexShrink: 0,

      padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px !important`,
    },
  },
}));
