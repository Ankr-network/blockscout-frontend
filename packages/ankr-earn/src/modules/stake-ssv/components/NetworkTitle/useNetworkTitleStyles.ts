import { makeStyles } from '@material-ui/core/styles';

export const useNetworkTitleStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    margin: theme.spacing(-8.75, 0, -8.75, 0),
    fontSize: 172,
  },
}));
