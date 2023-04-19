import { makeStyles } from 'tss-react/mui';
import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

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
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('md')]: {
      fontSize: 42,
      marginBottom: theme.spacing(8),
    },
  },
  header: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,

    [`& th`]: {
      borderBottom: 'none',
    },

    [`& tr:first-of-type th`]: {
      color: theme.palette.common.black,
      marginBottom: theme.spacing(1),

      [`&.premium`]: {
        background: getPremiumColorGradient(theme),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        '-webkit-box-decoration-break': 'clone',
      },

      [`&.enterprise`]: {
        color: theme.palette.primary.main,
      },
    },

    [`& tr:last-of-type th`]: {
      color: theme.palette.text.secondary,
      paddingBottom: theme.spacing(7.5),
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
