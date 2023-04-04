import { makeStyles } from 'tss-react/mui';

export const useLocationsTableStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    '& th': {
      paddingTop: 0,
    },

    '& th, & td': {
      borderBottom: 'none',
    },
    '& th:first-of-type, & td:first-of-type': {
      paddingLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '& th:last-of-type,  & td:last-of-type': {
      paddingRight: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  header: {
    fontSize: 16,
    padding: 0,
  },

  tableContainer: {
    '&&': {
      padding: 0,
    },
  },

  icon: {
    color: theme.palette.grey[600],
  },
  activeIcon: {
    color: theme.palette.primary.main,
  },
  tableHead: {
    fontSize: 14,
  },
}));
