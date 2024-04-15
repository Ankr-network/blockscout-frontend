import { makeStyles } from 'tss-react/mui';

export const usePlusLinkStyles = makeStyles()(theme => ({
  root: {
    borderRadius: 8,
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
    height: 24,
    minWidth: 24,
  },
  icon: {
    height: 20,
    width: 20,
    '&&': {
      color: theme.palette.common.white,
    },
  },
}));
