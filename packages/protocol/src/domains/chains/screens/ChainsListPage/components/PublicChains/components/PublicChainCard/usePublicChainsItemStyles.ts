import { makeStyles } from 'tss-react/mui';

export const usePublicChainsItemStyles = makeStyles()(theme => ({
  publicChainActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
  },
  publicChainCopyEndpointButton: {
    minHeight: 30,
    height: 30,
  },
  publicChainAddNetworkButton: {
    backgroundColor: theme.palette.background.paper,
    svg: {
      width: 20,
      height: 20,
    },
  },
}));
