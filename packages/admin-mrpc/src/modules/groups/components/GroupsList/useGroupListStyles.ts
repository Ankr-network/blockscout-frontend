import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

export const useGroupListStyles = makeStyles()((theme: Theme) => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      td: {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));
