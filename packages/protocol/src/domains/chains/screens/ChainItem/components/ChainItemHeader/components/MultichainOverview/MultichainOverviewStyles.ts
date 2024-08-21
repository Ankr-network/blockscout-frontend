import { makeStyles } from 'tss-react/mui';

export const useMultichainOverviewStyles = makeStyles()(theme => ({
  multichainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  iconRoot: {
    height: 48,
    width: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    marginRight: theme.spacing(3),
  },
  icon: {
    color: theme.palette.primary.main,
    height: 32,
    width: 32,
  },
  text: {
    color: theme.palette.text.primary,
  },
  multichainDescriptionTitle: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  multichainDescription: {
    display: 'flex',
    maxWidth: 430,
  },
}));
