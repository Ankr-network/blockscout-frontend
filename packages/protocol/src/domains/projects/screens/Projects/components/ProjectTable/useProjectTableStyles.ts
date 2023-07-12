import { makeStyles } from 'tss-react/mui';

export const useProjectTableStyles = makeStyles()(theme => ({
  table: {
    padding: 0,
    backgroundColor: 'transparent',
    color: theme.palette.grey[600],
  },
  head: {
    borderBottom: 'none',
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: 400,
    padding: theme.spacing(0, 8, 4, 8),
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
  },
  preloader: {
    margin: theme.spacing(3, 0),
  },
}));
