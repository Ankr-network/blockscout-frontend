import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  balanceCheckbox: {
    marginBottom: theme.spacing(20),
  },
  description: {
    fontSize: 14,
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontWeight: 400,
  },
  label: {
    marginTop: theme.spacing(0.5),
  },
  row: {
    marginBottom: theme.spacing(3),
  },
  subtitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
    '&:first-of-type': {
      marginTop: 0,
    },
  },
  divider: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(5),
    height: 1,
    backgroundColor: theme.palette.grey['400'],
  },
}));
