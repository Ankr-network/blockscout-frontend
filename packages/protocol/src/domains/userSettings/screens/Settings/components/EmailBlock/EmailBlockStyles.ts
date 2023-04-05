import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  row: {
    display: 'flex',
    gap: theme.spacing(8),

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    gridGap: theme.spacing(7.5),
    justifyContent: 'space-between',
    padding: theme.spacing(7.5),
    borderRadius: 30,

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: 20,
      padding: theme.spacing(2 * 2.5),
    },
  },
  text: {
    color: theme.palette.text.primary,
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
  },
  email: {
    fontSize: 34,
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));
