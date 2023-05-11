import { makeStyles } from 'tss-react/mui';

export const useSettingsTabsStyles = makeStyles()(theme => ({
  root: {
    marginBottom: theme.spacing(8),
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 17,
    display: 'inline-flex',

    '& button': {
      borderRadius: 15,
    },
  },
}));
