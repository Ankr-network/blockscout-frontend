import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useABIMethodFieldStyles = makeStyles()((theme: Theme) => ({
  abiMethodField: {
    gap: theme.spacing(2 * 1.75),

    marginTop: theme.spacing(2 * 1.75),
  },
  label: {
    fontSize: 14,
    marginTop: theme.spacing(2 * 1),

    textTransform: 'capitalize',

    fontWeight: 400,
  },
  methodField: {
    '& div': {
      '&:hover': {
        borderColor: theme.palette.background.default,
      },

      '&.Mui-focused': {
        borderColor: theme.palette.background.default,
      },
    },
  },
}));
