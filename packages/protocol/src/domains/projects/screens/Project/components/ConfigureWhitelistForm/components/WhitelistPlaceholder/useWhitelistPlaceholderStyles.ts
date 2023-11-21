import { makeStyles } from 'tss-react/mui';

export const useWhitelistPlaceholderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  image: {
    width: 160,
    height: 160,
  },
  text: {
    color: theme.palette.text.secondary,

    letterSpacing: '-0.01em',

    lineHeight: '140%',
  },
}));
