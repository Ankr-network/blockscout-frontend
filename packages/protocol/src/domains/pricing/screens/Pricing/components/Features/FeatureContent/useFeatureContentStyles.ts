import { makeStyles } from 'tss-react/mui';
import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const useFeatureContentStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(7.5, 7.5, 0, 7.5),
    position: 'relative',
  },
  header: {
    width: '100%',

    [`& .premium`]: {
      background: getPremiumColorGradient(theme),
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      '-webkit-box-decoration-break': 'clone',
    },

    [`& .enterprise`]: {
      color: theme.palette.primary.main,
    },
  },
  summary: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  collapse: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    margin: theme.spacing(7.5, -7.5, 0, -7.5),
    padding: theme.spacing(0, 4),
  },
  icon: {
    position: 'absolute',
    top: theme.spacing(12.5),
    right: theme.spacing(7.5),
  },
  unCollapseIcon: {
    transform: 'rotate(180deg)',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(4, 0),
  },
  check: {
    color: theme.palette.primary.main,
  },
  cross: {
    color: theme.palette.text.secondary,
  },
  soon: {
    width: theme.spacing(12),
    margin: '0 auto',
  },
  mobileSoon: {
    width: theme.spacing(12),
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
