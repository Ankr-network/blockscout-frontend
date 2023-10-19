import { makeStyles } from 'tss-react/mui';

export const useTableStyles = makeStyles()(theme => ({
  tableContainer: {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing(6),
  },
  headerCell: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '140%',
    backgroundColor: theme.palette.background.paper,
  },
  cell: {
    '&:first-of-type': {
      paddingLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },

    '&:last-of-type': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  typeCell: {
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    width: 'fit-content',
    padding: theme.spacing(0.5, 2),
  },
}));
