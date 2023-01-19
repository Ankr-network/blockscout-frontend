import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  balanceCheckbox: {
    marginBottom: theme.spacing(2 * 10),
  },
  description: {
    fontSize: 14,
    marginLeft: theme.spacing(2 * 3),
    marginBottom: theme.spacing(2 * 2.5),
    fontWeight: 400,
  },
  label: {
    marginTop: theme.spacing(2 * 0.25),
  },
  divider: {
    marginTop: theme.spacing(2 * 1.25),
    marginBottom: theme.spacing(2 * 2.5),
    height: 1,
    backgroundColor: theme.palette.grey['400'],
  },
}));
