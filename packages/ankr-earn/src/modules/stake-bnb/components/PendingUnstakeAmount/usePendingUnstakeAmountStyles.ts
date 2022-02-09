import { makeStyles } from '@material-ui/core/styles';

export const usePendingUnstakeAmountStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '33px 42px 33px 42px',
    borderRadius: 65,
    [theme.breakpoints.down('md')]: {
      borderRadius: 32,
      gridColumn: '1/-1',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2.5),
    },
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(3),
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  amount: {
    flex: 1,
    lineHeight: 1,
    fontSize: 36,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'flex-end',
    '& > span': {
      display: 'flex',
      alignItems: 'baseline',
    },
    '& .unit': {
      paddingLeft: 8,
      fontSize: 18,
    },
  },
  title: {
    fontSize: 20,
  },
}));
