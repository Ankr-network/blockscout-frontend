import { makeStyles } from 'tss-react/mui';

export const useAmountBadgeStyles = makeStyles<boolean>()((theme, isBig) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.5, 1),
    height: isBig ? 20 : 16,
    minWidth: isBig ? 20 : 12,
  },
  text: {
    color: theme.palette.common.white,
  },
}));
