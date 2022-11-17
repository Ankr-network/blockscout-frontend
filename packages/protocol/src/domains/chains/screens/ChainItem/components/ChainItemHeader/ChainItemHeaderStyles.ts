import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useChainItemHeaderStyles = makeStyles<Theme, boolean>(theme => ({
  chainItemHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    marginBottom: theme.spacing(7.5),
    padding: theme.spacing(3.75),

    borderRadius: theme.spacing(3.75),

    background: theme.palette.background.paper,
  },
  controls: {
    display: 'flex',
    gap: theme.spacing(1.5),

    flexDirection: shouldOnlyShowMobileSelector =>
      shouldOnlyShowMobileSelector ? 'column' : undefined,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  desktopGroupSelector: {
    display: shouldOnlyShowMobileSelector =>
      shouldOnlyShowMobileSelector ? 'none' : undefined,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileGroupSelector: {
    display: shouldOnlyShowMobileSelector =>
      shouldOnlyShowMobileSelector ? 'flex' : 'none',

    [theme.breakpoints.down('md')]: {
      display: 'flex !important',
    },
  },
}));
