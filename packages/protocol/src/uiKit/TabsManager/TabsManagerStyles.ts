import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(0.25),
    },
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
}));
