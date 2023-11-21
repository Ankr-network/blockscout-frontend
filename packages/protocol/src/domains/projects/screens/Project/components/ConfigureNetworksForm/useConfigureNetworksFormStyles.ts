import { makeStyles } from 'tss-react/mui';

export const useConfigureNetworksFormStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 540,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
}));
