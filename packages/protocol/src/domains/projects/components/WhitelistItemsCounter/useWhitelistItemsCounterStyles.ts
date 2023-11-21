import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemsCounterStyles = makeStyles()(theme => ({
  root: {
    height: 32,
    width: 'fit-content',
    borderRadius: 12,
    border: `2px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(1, 3),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));
