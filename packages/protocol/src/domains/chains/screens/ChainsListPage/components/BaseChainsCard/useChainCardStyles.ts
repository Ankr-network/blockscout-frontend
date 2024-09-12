import { makeStyles } from 'tss-react/mui';
import { lighten } from '@mui/material';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainCardStyles = makeStyles()(theme => ({
  baseChainCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '&&': {
      padding: theme.spacing(6),
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    minHeight: 200,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  multichainCard: {
    border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
  },
  baseChainCardDescription: {
    maxWidth: '100%',
    '& > div': {
      gap: theme.spacing(1.5),
    },
  },
  secondInfo: {
    width: '100%',
  },
  information: {
    color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
    display: 'inline-flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    width: 150,
    transition: 'bottom 0.5s ease 0s',
    '&& button': {
      boxShadow: 'none',
    },

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  skeleton: {
    width: '100%',
    maxWidth: 140,
    marginTop: theme.spacing(1),
    height: 21,
    transform: 'none',
  },
}));
