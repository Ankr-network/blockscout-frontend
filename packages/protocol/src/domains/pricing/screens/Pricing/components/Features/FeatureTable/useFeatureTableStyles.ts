import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient, isLightTheme } from 'uiKit/Theme/themeUtils';

export const useFeatureTableStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(7.5),
    padding: theme.spacing(7.5),
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

      [`&.premium`]: {
        background: getPremiumColorGradient(theme),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitBoxDecorationBreak: 'clone',
      },

      [`&.enterprise`]: {
        color: theme.palette.primary.main,
      },
    },

    [`& tr:last-of-type th`]: {
      color: theme.palette.text.secondary,
    },
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
