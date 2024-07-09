import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  tool: {
    display: 'flex',
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
    height: 20,
    width: 20,
  },
  chainLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 2, 0.5, 1),
    borderRadius: 8,
    lineHeight: 1,
  },
  circle: {
    marginRight: theme.spacing(2),
  },
}));
