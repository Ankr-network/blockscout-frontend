import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2 * 3),
    paddingRight: theme.spacing(2 * 3),
    paddingTop: theme.spacing(2 * 1),
    paddingBottom: theme.spacing(2 * 1),
    marginBottom: theme.spacing(2 * 4),

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
    padding: theme.spacing(2 * 2, 0),
  },

  tableContainer: {
    '&&': {
      padding: 0,
    },
  },

  flag: {
    marginBottom: theme.spacing(2 * 0.375),
  },
  preloader: {
    height: theme.spacing(2 * 8.25),
  },
  subtitle2: {
    fontSize: 12,
  },
}));
