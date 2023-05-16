import { makeStyles } from 'tss-react/mui';

export const useTwoFASetupButtonSwitcherStyles = makeStyles()(theme => ({
  link: {
    fontSize: 14,
    height: 'auto',
    padding: 0,
    minWidth: 'auto',
    lineHeight: theme.spacing(2 * 3.25),

    '&:hover': {
      color: theme.palette.grey[900],
      backgroundColor: 'transparent',
    },
  },
}));
