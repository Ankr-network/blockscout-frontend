import { makeStyles, Theme } from '@material-ui/core/styles';

export const useSecondaryTabsStyles = makeStyles<Theme>(theme => ({
  secondaryTabs: {
    display: 'inline-flex',

    width: 'min-content',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(1.75),

    background: theme.palette.background.default,
  },
}));
