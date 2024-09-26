import { makeStyles } from 'tss-react/mui';

export const useChainItemHeaderStyles = makeStyles()(theme => ({
  chainItemHeader: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(6, 8),
    borderRadius: theme.spacing(5),
    background: theme.palette.background.paper,

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5.5, 4),
    },
  },
}));

export const useChainItemHeaderContentStyles = makeStyles()(theme => ({
  content: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
    gap: theme.spacing(7.5),

    marginTop: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  multiChainContent: {
    width: '100%',
  },
  noMargin: {
    margin: 0,
  },
  multichainLinksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',

      '& > div': {
        margin: 0,
      },
    },
  },
  chainHeaderSelector: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
      '& div': {
        width: '100%',
      },
    },
  },
}));
