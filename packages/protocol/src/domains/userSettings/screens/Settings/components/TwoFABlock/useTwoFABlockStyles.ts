import { makeStyles } from 'tss-react/mui';

export const useTwoFABlockStyles = makeStyles()(theme => ({
  top: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(8),
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    height: theme.spacing(6),
    padding: theme.spacing(0, 2, 0, 1),
    marginRight: theme.spacing(3),

    '& svg': {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  off: {
    color: theme.palette.error.main,
  },
  on: {
    color: theme.palette.success.main,
  },
  info: {
    marginTop: theme.spacing(8),
  },
  description: {
    marginTop: theme.spacing(0.5),

    '& span': {
      letterSpacing: 'normal',
    },

    '& a': {
      color: theme.palette.primary.main,
    },
  },
  topSkeleton: {
    height: 24,
    width: 200,
    transform: 'none',
    borderRadius: theme.spacing(2 * 1),
  },
  bottomSkeleton: {
    height: 24,
    width: '50%',
    transform: 'none',
    borderRadius: theme.spacing(2 * 1),
  },
}));
