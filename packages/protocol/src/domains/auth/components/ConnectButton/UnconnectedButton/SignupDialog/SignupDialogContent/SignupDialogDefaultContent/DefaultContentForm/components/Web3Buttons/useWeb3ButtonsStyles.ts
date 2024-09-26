import { makeStyles } from 'tss-react/mui';

export const useWeb3ButtonsStyles = makeStyles()(theme => ({
  button: {
    color: theme.palette.text.primary,

    '&.Mui-disabled': {
      background: 'transparent',

      svg: {
        opacity: 0.5,
      },
    },
  },
}));
