import { makeStyles } from 'tss-react/mui';

export const usePreloaderStyles = makeStyles()(theme => ({
  root: {
    height: theme.spacing(52),
  },
}));
