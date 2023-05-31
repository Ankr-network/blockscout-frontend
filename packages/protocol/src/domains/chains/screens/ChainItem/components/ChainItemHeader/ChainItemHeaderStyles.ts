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
