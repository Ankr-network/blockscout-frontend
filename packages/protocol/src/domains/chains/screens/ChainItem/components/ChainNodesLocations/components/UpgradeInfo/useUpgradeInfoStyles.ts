import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const useUpgradeInfoStyls = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(0.5),
    borderRadius: 20,
    background: getPremiumColorGradient(theme),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    padding: theme.spacing(6, 8),
    backgroundColor: theme.palette.background.paper,
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
    },
  },
  info: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    color: theme.palette.grey[600],

    '& em': {
      color: theme.palette.text.primary,
      fontStyle: 'normal',
      marginRight: theme.spacing(2),
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    margin: theme.spacing(0, -4),

    '& svg': {
      marginLeft: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      display: 'inline-flex',
      marginTop: theme.spacing(-1),
    },
  },
}));
