import { makeStyles } from 'tss-react/mui';

export const useWhitelistItemChainsSelectorTitleStyles = makeStyles()(
  theme => ({
    root: {
      marginBottom: theme.spacing(3),

      letterSpacing: '-0.01em',

      lineHeight: '135%',
    },
  }),
);
