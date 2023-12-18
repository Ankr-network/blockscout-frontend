import { makeStyles } from 'tss-react/mui';

export const useProjectsTableStyles = makeStyles()(theme => ({
  table: {
    padding: 0,
    backgroundColor: 'transparent',
    color: theme.palette.grey[600],
    overflow: 'hidden',
  },
  head: {
    borderBottom: 'none',
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 400,
    padding: theme.spacing(0, 8, 1.5, 8),
  },
  rowContainer: {
    borderBottom: 'none',
  },
  row: {
    borderRadius: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(3),
    height: theme.spacing(25),
    borderBottom: 'none',
    padding: theme.spacing(0, 8),
    cursor: 'pointer',
  },
  disabledRow: {
    cursor: 'not-allowed',
  },
  preloader: {
    margin: theme.spacing(3, 0),
  },
}));
