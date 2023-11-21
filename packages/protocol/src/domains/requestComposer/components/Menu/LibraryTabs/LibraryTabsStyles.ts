import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTopUpTabsStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'inline-flex',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2 * 1.75),

    background: theme.palette.background.default,

    marginBottom: theme.spacing(2 * 1.5),
    width: '100%',

    '& div': {
      width: '100%',
    },
  },
}));
