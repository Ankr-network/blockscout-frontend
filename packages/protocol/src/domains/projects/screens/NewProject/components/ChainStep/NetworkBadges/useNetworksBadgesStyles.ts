import { makeStyles } from 'tss-react/mui';

export const useNetworksBadgesStyles = makeStyles()(theme => ({
  badgesWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5, 3),
    backgroundColor: theme.palette.background.default,
    whiteSpace: 'nowrap',
    fontWeight: 500,
  },
  closeIcon: {
    '&&': {
      fontSize: 12,
    },
  },
  closeButton: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    width: 'auto',
    height: 'auto',
  },
  editButton: {
    width: 35,
    height: 35,
  },
  editIcon: {
    color: theme.palette.primary.main,
    '&&': {
      fontSize: 20,
    },
  },
}));
