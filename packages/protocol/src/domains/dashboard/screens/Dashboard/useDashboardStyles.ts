import { makeStyles } from 'tss-react/mui';
import { commonShadow } from 'uiKit/Theme/themeUtils';
import { SELECT_WIDTH } from 'modules/common/components/ProjectSelect/ProjectSelectStyles';

export const useDashboardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
  },
  projectSelect: {
    width: 'auto',
  },
  selector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  selectorContent: {
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(3),
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),

    /* scrollbar cross-platform styles */
    '&::-webkit-scrollbar': {
      height: 6,
      width: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[200],
      borderRadius: 4,
    },

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  timeframe: {
    marginLeft: 'auto',
  },

  tab: {
    height: 38,
    minHeight: 38,
    fontWeight: 'bold',
  },

  menuPaper: {
    boxShadow: commonShadow,
    width: SELECT_WIDTH,
    marginTop: theme.spacing(4),
    maxHeight: 200,

    '&::-webkit-scrollbar': {
      width: 3,
      height: 3,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: 2,
    },
  },
  menuItemWrapper: {
    borderRadius: 14,
    width: '93%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    '&+&': {
      marginTop: theme.spacing(1),
    },
  },
}));
