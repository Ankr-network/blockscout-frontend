import { makeStyles } from 'tss-react/mui';
import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const usePremiumContentStyles = makeStyles()(theme => ({
  root: {
    borderRadius: theme.spacing(5),
    background: getPremiumColorGradient(theme),
    width: theme.spacing(83.5),
    padding: theme.spacing(0.5),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    padding: theme.spacing(6, 8),
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(4.5),
    height: '100%',
  },
  title: {
    display: 'block',
    color: theme.palette.text.primary,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '28px',
    marginBottom: theme.spacing(4),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1),

    '& svg': {
      marginRight: theme.spacing(2),
    },

    '& em': {
      fontStyle: 'normal',
      fontWeight: 700,
    },
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));
