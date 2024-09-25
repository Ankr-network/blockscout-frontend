import { makeStyles } from 'tss-react/mui';

const name = 'TruncatedLink';

export const useTruncatedLinkStyles = makeStyles({ name })(() => ({
  root: {
    overflow: 'hidden',

    display: 'flex',

    width: '100%',

    letterSpacing: 0,
  },
  linkStart: {
    overflow: 'hidden',

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));
