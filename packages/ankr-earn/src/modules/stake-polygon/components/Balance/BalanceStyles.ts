import { makeStyles, Theme } from '@material-ui/core/styles';

export const useBalanceStyles = makeStyles<Theme>(theme => ({
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
  rootSmartChain: {
    minHeight: 195.6,
    [theme.breakpoints.down('xs')]: {
      minHeight: 177.6,
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

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  titleContainerArea: {
    fontSize: 20,
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 12,
    fontWeight: 400,
    fontSize: 13,
  },
  tooltip: {
    margin: '0 0 0 10px',
    padding: '0 0 0 1px',
  },

  tradeContainerArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  tradeBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 15px 4px 15px',
    border: `1px solid rgba(255, 255, 255, .2)`,
    borderRadius: 65,

    '&:hover': {
      borderColor: '#ffffff',
    },
  },
  tradePriceContainer: {
    marginTop: 7,
    fontSize: 13,
    fontWeight: 400,
    textAlign: 'center',
  },
  tradeBtnIcon: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px 0 0',
  },
  tradeBtnText: {
    fontSize: 13,
    fontWeight: 500,
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
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 0 0 36px',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0, 0, 0),
    },
  },
  btnContainer: {
    '&:first-child': {
      margin: '0 16px 0 0',
    },
  },

  smartChainWarnArea: {
    borderLeft: `2px solid #006DFF`,
  },
  smartChainWarnTxt: {
    margin: '0 0 0 12px',
  },
}));
