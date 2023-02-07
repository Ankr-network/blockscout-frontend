import { makeStyles, Theme } from '@material-ui/core/styles';
import { ANKR_COLOR } from 'domains/chains/screens/ChainItem/components/Info/InfoStyles';

interface SpinnerStyleProps {
  size: number;
}

export const useStyles = makeStyles<Theme, SpinnerStyleProps>(theme => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
  },
  container: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #E1E9FD',
    borderRadius: 90,
    padding: theme.spacing(1.5, 3),
  },
  icon: {
    width: 32,
    height: 32,
    color: theme.palette.primary.main,
  },
  text: {
    marginLeft: theme.spacing(1.5),
    fontWeight: 'bold',
    color: ANKR_COLOR,
  },
}));
