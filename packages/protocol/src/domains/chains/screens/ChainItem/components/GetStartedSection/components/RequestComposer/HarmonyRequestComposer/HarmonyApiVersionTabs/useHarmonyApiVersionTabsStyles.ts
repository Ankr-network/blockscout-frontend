import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useHarmonyApiVersionTabsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(1),
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '28px',
  },
  tabs: {},
}));
