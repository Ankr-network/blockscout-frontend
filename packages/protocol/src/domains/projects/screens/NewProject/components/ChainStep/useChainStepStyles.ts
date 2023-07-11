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
}));
