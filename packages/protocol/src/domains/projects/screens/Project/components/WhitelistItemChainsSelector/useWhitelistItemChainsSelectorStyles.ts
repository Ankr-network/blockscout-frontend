import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemChainsSelectorStyles = makeStyles()(theme => ({
  description: {
    marginBottom: theme.spacing(4),
  },
  checkboxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));
