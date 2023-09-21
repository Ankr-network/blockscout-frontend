import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSecondaryTabsStyles = makeStyles()((theme: Theme) => ({
  secondaryTabs: {
    display: 'inline-flex',

    width: 'auto',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(3.5),

    background: theme.palette.background.default,
  },
}));
