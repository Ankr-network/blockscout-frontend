import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 3),
    borderRadius: 18,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 15,
    },
  },
  overlayLoader: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.6,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    tableLayout: 'fixed',
    '& tbody $row:last-child td': {
      borderBottom: 'none',
    },
  },
  thead: {
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  row: {
    '& td:first-child, & th:first-child': { paddingLeft: 0 },
    '& td:last-child, & th:last-child': { paddingRight: 0 },
  },
  headCell: {
    '&&': {
      backgroundColor: theme.palette.background.paper,
      fontWeight: 'normal',
      fontSize: 11,
      padding: theme.spacing(1.5, 1),
    },
  },
  headCellSort: {
    marginLeft: theme.spacing(1),
  },
  headCellSortable: {
    cursor: 'pointer',
  },
  bodyCell: {
    '&&': {
      borderBottom: `1px solid ${theme.palette.background.default}`,
      fontSize: 14,
      padding: theme.spacing(2.2, 1),
      wordWrap: 'break-word',
    },
  },
  paginationMoreCell: {
    '&&': {
      paddingTop: `${theme.spacing(1)}px !important`,
    },
  },
}));
