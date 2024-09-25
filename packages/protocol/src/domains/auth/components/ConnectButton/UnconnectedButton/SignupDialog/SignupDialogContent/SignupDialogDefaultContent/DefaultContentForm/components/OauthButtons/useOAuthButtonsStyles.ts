import { makeStyles } from 'tss-react/mui';

export const useOAuthButtonsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  button: {
    color: theme.palette.text.primary,

    '&.Mui-disabled': {
      background: 'transparent',

      svg: {
        opacity: 0.5,
      },
    },
  },
  icon: {
    '&&': {
      fontSize: 24,
      color: theme.palette.text.primary,
    },
  },
}));
