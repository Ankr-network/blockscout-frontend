import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTimeframeTabsStyles = makeStyles()((theme: Theme) => ({
  timeframeTabs: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2 * 0.25),

    border: `2px solid ${theme.palette.divider}`,
    borderRadius: 15,

    backgroundColor: theme.palette.grey[100],
  },
  tab: {
    flexGrow: 1,
  },
}));
