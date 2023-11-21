import { makeStyles } from 'tss-react/mui';

export const useWhitelistTableControlsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(4),
  },
}));
