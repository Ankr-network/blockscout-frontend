import { makeStyles, Theme } from '@material-ui/core/styles';

export const useTimeframeTabsStyles = makeStyles<Theme>(theme => ({
  timeframeTabs: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(0.25),

    border: `2px solid ${theme.palette.grey[400]}`,
    borderRadius: 11,

    backgroundColor: theme.palette.grey[400],
  },
  tab: {
    flexGrow: 1,
  },
}));
