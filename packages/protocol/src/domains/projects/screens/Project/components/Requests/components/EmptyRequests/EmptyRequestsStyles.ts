import { makeStyles } from 'tss-react/mui';

import { premiumGradient } from 'uiKit/Theme/themeUtils';

export const useEmptyLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: 28,
  },

  /* Freemium styles */
  rootFreemium: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',

    height: '100%',
    gap: theme.spacing(2),
    margin: 'auto, 0',
  },
  freemiumMessage: {
    maxWidth: 260,

    '& i': {
      fontWeight: 700,
      fontStyle: 'normal',
      background: premiumGradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  freemiumButton: {
    padding: theme.spacing(1, 3),
  },
}));
