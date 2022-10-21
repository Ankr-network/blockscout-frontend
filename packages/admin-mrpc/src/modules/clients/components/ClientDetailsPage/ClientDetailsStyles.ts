import { makeStyles } from 'tss-react/mui';

export const useClientDetailsStyles = makeStyles()(theme => ({
  /* Details Page */
  spinnerTransactions: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(10),
  },

  /* Tabs */
  tabPanel: {
    padding: 0,
  },
  tab: {
    padding: 0,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 'bold',
    textTransform: 'none',
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(4),
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      color: theme.palette.grey['300'],
    },
  },

  /* ClientInfo */
  root: {
    minWidth: 275,
    marginTop: 20,
  },
  clientAddress: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  typeText: {
    marginRight: 10,
  },
  balanceTitle: {
    marginBottom: 10,
    marginTop: 20,
  },
  gridContainer: {
    margin: theme.spacing(6, 0),
    width: '100%',
  },
  gridItem: {
    paddingBottom: theme.spacing(5),
    '&+&': {
      marginLeft: theme.spacing(5),
    },
  },

  /* ClientBalancesInfo */
  balancesGridWrapper: {
    width: '100%',
  },

  /* ClientBalancesModal */
  balancesBtn: {
    marginBottom: 15,
  },
  button: {
    textTransform: 'none',
    width: '40%',
  },
  buttonSubtract: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 580,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(6),
  },
  form: {
    marginTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  select: {
    '& fieldset': {
      borderRadius: 24,
    },
  },

  /* Client usage table */
  tabsWrapper: {
    padding: '3px',
    backgroundColor: theme.palette.grey['200'],
    minWidth: 0,
    minHeight: 0,
    borderRadius: '11px',
    width: '192px', // 62(tab width)*3(tabs count)+6(paddingLeft+paddingRight)
  },
  tabUsagePeriod: {
    width: '62px',
    height: '28px',
    padding: '0 10px',
    borderRadius: '10px',
    minWidth: 0,
    minHeight: 0,
    transition: 'background-color .3s',
    fontWeight: 600,
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  csvLink: {
    marginLeft: theme.spacing(6),
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    transition: 'color .3s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  btnChainFilter: {
    color: theme.palette.text.primary,
    borderRadius: 20,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
  btnChainFilterActive: {
    color: theme.palette.background.paper,
  },
  chainFilterValue: {
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightLight,
  },
  progressbar: {
    height: 5,
    backgroundColor: theme.palette.action.disabledBackground,
    minWidth: 8,
    borderRadius: 4,
  },
}));
