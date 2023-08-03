import { makeStyles } from 'tss-react/mui';

export const useChainStepStyles = makeStyles()(theme => ({
  chainsRoot: {
    marginTop: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(6),
  },
  projectName: {
    display: 'block',
    marginBottom: theme.spacing(6),
  },
  nameInput: {
    width: 450,
  },
  tableContainer: {
    backgroundColor: 'transparent',
    padding: 0,
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
