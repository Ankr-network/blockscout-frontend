import { makeStyles } from 'tss-react/mui';

export const useCardLinkStyles = makeStyles()(theme => ({
  root: {
    height: 'auto',
    padding: 0,
    minHeight: 'auto',

    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconWrapper: {
    marginLeft: theme.spacing(1.5),
  },
  icon: {
    fontSize: '24px !important',
  },
}));
