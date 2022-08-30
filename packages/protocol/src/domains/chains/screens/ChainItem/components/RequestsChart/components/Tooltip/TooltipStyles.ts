import { Theme, makeStyles } from '@material-ui/core';

export const useTooltipStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1.5, 2.5),
    background: theme.palette.common.white,
    borderRadius: 12,
    boxShadow: `0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)`,
  },
  row: {
    textAlign: 'center',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
}));
