import { makeStyles } from 'tss-react/mui';

export const useChainInfoStyles = makeStyles()(theme => ({
  chainInfoName: {
    display: 'flex',
    alignItems: 'center',
  },
  chainInfoPremiumLabel: {
    marginLeft: theme.spacing(2),
    display: 'flex',
  },
}));
