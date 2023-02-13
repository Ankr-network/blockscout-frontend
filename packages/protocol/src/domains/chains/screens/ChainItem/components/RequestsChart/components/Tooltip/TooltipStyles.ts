import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTooltipStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2 * 1.5, 2 * 2.5),
    background: theme.palette.background.paper,
    borderRadius: 12,
    boxShadow: `0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)`,
  },
  row: {
    textAlign: 'center',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',

    color: theme.palette.text.primary,
  },
  time: {
    fontSize: 12,

    color: theme.palette.text.primary,
  },
}));
