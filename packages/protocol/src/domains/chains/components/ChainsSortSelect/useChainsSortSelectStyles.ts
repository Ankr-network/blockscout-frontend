import { selectClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useChainsSortSelectStyles = makeStyles()(theme => ({
  root: {
    width: 149,
  },
  selectRoot: {
    '&&': {
      borderRadius: 12,
      height: 32,
    },

    [`&&.${selectClasses.icon}`]: {
      color: theme.palette.grey[600],
    },
  },
  select: {
    '&&': {
      fontSize: 14,
    },

    [`&.${selectClasses.select}`]: {
      color: theme.palette.text.primary,
    },
  },
}));
