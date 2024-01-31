import { makeStyles } from 'tss-react/mui';

export const useUserIconStyles = makeStyles()(theme => ({
  root: {
    height: 20,
    width: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.yellow.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
