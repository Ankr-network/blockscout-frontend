import { makeStyles } from 'tss-react/mui';

export const useUserEndpointsWrapperStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(7.5),
    height: theme.spacing(24),
  },
}));
