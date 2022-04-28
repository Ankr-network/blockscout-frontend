import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'none',
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  link: {
    width: '100%',
  },
  section: {
    display: 'flex',
    flex: 1,
  },
  input: {
    flexGrow: 1,
    // maxHeight: 56,

    '& div': {
      width: '100%',
    },
  },
  deleteButton: {
    marginLeft: 10,
  },
  editButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
