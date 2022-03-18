import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
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
