import { makeStyles } from '@material-ui/core/styles';

export const useNetworkTitleStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    margin: theme.spacing(0, 0.625, 0, 0),
    fontSize: 18,
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    fontWeight: 400,
  },
}));
