import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderStyles = makeStyles()(theme => ({
  chainItemHeader: {
    marginBottom: theme.spacing(2 * 7.5),
    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    background: theme.palette.background.paper,
  },
}));

export const useChainItemHeaderContentStyles = makeStyles()(theme => ({
  controls: {
    display: 'flex',
    gap: theme.spacing(2 * 1.5),
    alignItems: 'center',

    marginTop: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2 * 3.75),
    },
  },
  desktopGroupSelector: {
    '&&': {
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
  },
  rootMobileGroupSelector: {
    '&&': {
      display: 'none',

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(7.5),

    marginTop: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  multiChainContent: {
    width: '100%',
  },
}));
