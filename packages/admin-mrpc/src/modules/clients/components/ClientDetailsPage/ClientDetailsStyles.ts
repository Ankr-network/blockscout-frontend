import { makeStyles } from '@material-ui/core/styles';

export const useClientDetailsStyles = makeStyles(theme => ({
  /* ClientInfo */
  root: {
    minWidth: 275,
  },
  clientInfoWrapper: {
    marginTop: 20,
  },
  typeText: {
    marginRight: 10,
  },
  balanceTitle: {
    marginBottom: 10,
    marginTop: 20,
  },

  /* ClientBalancesInfo */
  balancesGridWrapper: {
    width: '100%',
  },

  /* Transactions */
  transactionsWrapper: {
    marginTop: 40,
  },
  transactionsTitle: {
    marginBottom: 10,
    marginTop: 20,
  },

  /* ClientBalancesModal */
  balancesBtn: {
    marginTop: 15,
  },
  button: {
    textTransform: 'none',
    width: '40%',
  },
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 580,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    marginTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));
