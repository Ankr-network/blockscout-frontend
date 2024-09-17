import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useFeatureTableStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(7.5),
    maxWidth: 1240,
    width: '100%',
  },
  table: {
    borderCollapse: 'collapse',

    '& th, & td': {
      padding: 0,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    color: theme.palette.text.primary,

    [theme.breakpoints.down('md')]: {
      fontSize: 42,
    },
  },
  subtitle: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  subtitleRow: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  rowWithoutBorder: {
    borderBottom: 'none',

    '& td': {
      borderBottom: 'none',
    },
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(8, 0),
    width: '100%',
  },
  rowSubtitle: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(3.5),
  },
  header: {
    [`& th`]: {
      borderBottom: 'none',
    },

    [`& tr:first-of-type th`]: {
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(1),
    },

    [`& tr:last-of-type th`]: {
      color: theme.palette.text.primary,
    },
  },
  headerCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
  },
  row: {
    '& td': {
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
    },

    '& svg': {
      display: 'block',
      margin: '0 auto',
    },
  },
  name: {
    '&&': {
      textAlign: 'left',
      padding: theme.spacing(4, 0),
    },
  },
}));
