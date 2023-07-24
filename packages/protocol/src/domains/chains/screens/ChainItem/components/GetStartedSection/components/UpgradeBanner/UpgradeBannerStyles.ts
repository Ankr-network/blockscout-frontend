import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { commonLinear } from 'uiKit/Theme/themeUtils';

export const useUpgradeBannerStyles = makeStyles()((theme: Theme) => ({
  upgradeBanner: {
    borderRadius: theme.spacing(2 * 3.75),

    background: commonLinear,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2 * 3.75),

    margin: 3,
    padding: theme.spacing(2 * 3.75),

    borderRadius: 27,

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  message: {
    maxWidth: theme.spacing(2 * 74.25),

    color: theme.palette.grey[800],

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
  button: {
    flexShrink: 0,
    '&:hover': {
      color: theme.palette.background.paper,
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
