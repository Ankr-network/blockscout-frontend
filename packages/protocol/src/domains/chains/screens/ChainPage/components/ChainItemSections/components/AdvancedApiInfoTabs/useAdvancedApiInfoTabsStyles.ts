import { makeStyles } from 'tss-react/mui';
import { alpha, darken, Theme } from '@mui/material';

export const getLinkStyles = (theme: Theme) => ({
  borderBottom: `1px solid ${alpha(theme.palette.link.main, 0.5)}`,
  textDecoration: 'none',
  transition: 'color .3s, border-color .3s',

  '&&': {
    color: theme.palette.primary.main,
  },

  '&:hover': {
    textDecoration: 'none',
    color: darken(theme.palette.primary.main, 0.2),
    borderColor: darken(theme.palette.primary.main, 0.2),
  },
});

export const useAdvancedApiInfoTabsStyles = makeStyles()(theme => ({
  advancedApiInfoTabsPaper: {
    backgroundImage: 'none',
    padding: theme.spacing(6, 8),
    minHeight: 264,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
  advancedApiInfoTabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
  },
  advancedApiInfoTabsInner: {
    gap: theme.spacing(4),
  },

  /* Tabs */
  advancedApiPrimaryTab: {
    marginRight: 0,
    fontSize: 16,
    boxShadow: 'none',

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));
