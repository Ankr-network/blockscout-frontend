import { makeStyles } from 'tss-react/mui';

export const useChainStepStyles = makeStyles()(theme => ({
  chainsRoot: {
    marginTop: theme.spacing(10),
  },
  chainsHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  chainTitleWrapper: {
    marginBottom: theme.spacing(4),
    maxWidth: 460,
    paddingRight: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    color: theme.palette.text.secondary,
  },
  tableContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    tableLayout: 'fixed',
  },
  cell: {
    '&&': {
      borderColor: theme.palette.divider,
      backgroundColor: 'transparent',
      borderRadius: 0,
      fontWeight: 400,
    },
    '&:first-of-type': {
      paddingLeft: 0,
    },
    '&:last-of-type': {
      paddingRight: 0,
    },
  },
  inactive: {
    opacity: 0.5,
  },
  dialogTitle: {
    fontSize: 28,
    paddingRight: theme.spacing(15),
    alignItems: 'center',
    display: 'flex',
  },
  chainItemWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 5),
    marginBottom: theme.spacing(4),
  },
  chainItem: {
    display: 'flex',
    alignItems: 'center',
  },
  chainSelectListWrapper: {
    marginBottom: theme.spacing(4),
  },
  modalBtn: {
    marginTop: theme.spacing(3),
  },
}));
