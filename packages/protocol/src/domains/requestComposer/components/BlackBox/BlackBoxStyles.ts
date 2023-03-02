import { makeStyles } from 'tss-react/mui';

export const useBlackBoxStyles = makeStyles<boolean>()((theme, isLight) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    padding: theme.spacing(7, 0, 7),

    borderRadius: theme.spacing(5),

    background: isLight
      ? theme.palette.grey[800]
      : theme.palette.background.default,
  },
}));
