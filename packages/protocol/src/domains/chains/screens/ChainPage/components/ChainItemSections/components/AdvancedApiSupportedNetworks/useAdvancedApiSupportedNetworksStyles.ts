import { makeStyles } from 'tss-react/mui';

export const useAdvancedApiSupportedNetworksStyles = makeStyles()(theme => ({
  supportedNetworksWrapper: {
    display: 'flex',
    paddingTop: theme.spacing(4),
  },
  supportedNetworksList: {
    width: '50%',
    paddingRight: theme.spacing(8),

    '&+&': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(8),
    },
  },
  tabContentTitle: {
    display: 'block',
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  supportedChainsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
}));
