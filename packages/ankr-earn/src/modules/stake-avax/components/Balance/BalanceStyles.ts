import { alpha } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useBalanceStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(4.125, 5.25, 4.125, 5.25),
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
    margin: theme.spacing(0, 0, 0, 1.25),
    padding: theme.spacing(0, 0, 0, '1px'),
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
    padding: theme.spacing(0.375, 1.875, 0.5, 1.875),
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
    borderRadius: 65,

    '&:hover': {
      borderColor: theme.palette.common.white,
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
    padding: theme.spacing(0, 1, 0, 0),
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
    padding: theme.spacing(0, 0, 0, 4.5),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0, 0, 0),
    },
  },
  btnContainer: {
    '&:first-child': {
      margin: theme.spacing(0, 2, 0, 0),
    },
  },
}));
