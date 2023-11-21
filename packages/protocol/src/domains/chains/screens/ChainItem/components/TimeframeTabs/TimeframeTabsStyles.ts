import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTimeframeTabsStyles = makeStyles()((theme: Theme) => ({
  timeframeTabs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: 11,
    backgroundColor: theme.palette.grey[100],
  },
  tab: {
    flexGrow: 1,
  },
}));
