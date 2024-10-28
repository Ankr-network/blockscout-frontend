import { makeStyles } from 'tss-react/mui';

export const useFilterTagStyles = makeStyles({ name: 'FilterTag ' })(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  icon: {
    height: 20,
    width: 20,
  },
  activeTagIcon: {
    color: theme.palette.common.white,
  },
  amountBadge: {
    height: 20,
    minWidth: 18,
    backgroundColor: theme.palette.primary.light,

    '& span': {
      fontSize: 12,
      color: theme.palette.primary.main,
    },
  },
  generalBg: {
    backgroundColor: theme.palette.background.paper,
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
}));
