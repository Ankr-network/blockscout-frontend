import { makeStyles } from 'tss-react/mui';

export const useAnkrNetworkIconStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 60,
    height: 60,

    borderRadius: '50%',

    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.common.white,

    fontSize: 40,
  },
}));
