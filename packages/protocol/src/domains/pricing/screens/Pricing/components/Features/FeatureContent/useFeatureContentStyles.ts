import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useFeatureContentStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(5, 4, 0, 4),
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(12),
    width: '100%',
    color: theme.palette.text.primary,
  },
  summary: {
    color: theme.palette.text.primary,
    display: 'block',
    marginTop: theme.spacing(1),
  },
  collapse: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    margin: theme.spacing(5, -4, 0, -4),
    padding: theme.spacing(0, 4),
  },
  icon: {
    position: 'absolute',
    top: 19,
    right: 30,
  },
  collapseIcon: {
    color: theme.palette.primary.main,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(4, 0),
  },
  fullRow: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
  },
  valueWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  value: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  rowSubtitle: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(3.5),
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
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(4, 0, 2, 0),
    width: '100%',
  },
  button: {
    margin: theme.spacing(6, 2, 0, 2),
    width: 'fit-content',

    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
    },
  },
  fullWidthButton: {
    width: '100%',
  },
}));
