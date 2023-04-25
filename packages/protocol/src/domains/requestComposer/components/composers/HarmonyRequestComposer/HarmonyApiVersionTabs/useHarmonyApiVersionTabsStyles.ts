import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useHarmonyApiVersionTabsStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2 * 2),
  },
  title: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2 * 1),
    fontSize: 16,
    fontWeight: 700,
    lineHeight: theme.spacing(2 * 5),
  },
}));
