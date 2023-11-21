import { makeStyles } from 'tss-react/mui';

export const useWhitelistTableHeadStyles = makeStyles()(theme => ({
  cell: {
    height: 32,
    verticalAlign: 'top',
  },
  content: {
    color: theme.palette.text.secondary,

    letterSpacing: 'normal',

    lineHeight: '140%',
  },
}));
