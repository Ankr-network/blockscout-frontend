import { Theme, makeStyles } from '@material-ui/core/styles';

export const useABIMethodFieldStyles = makeStyles<Theme>(theme => ({
  abiMethodField: {
    gap: theme.spacing(1.75),

    marginTop: theme.spacing(1.75),
  },
  label: {
    marginTop: theme.spacing(1),

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
