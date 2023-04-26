import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'none',
    columnGap: theme.spacing(2 * 2),
    rowGap: theme.spacing(2 * 3),
    marginTop: theme.spacing(2 * 3),
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

    '& div': {
      width: '100%',
    },
  },
  deleteButton: {
    marginLeft: theme.spacing(2 * 1.25),
  },
  editButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
