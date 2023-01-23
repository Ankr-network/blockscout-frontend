import { makeStyles } from 'tss-react/mui';

export const useH1TagStyles = makeStyles()(() => ({
  title: {
    visibility: 'hidden',
    lineHeight: 0,
    maxWidth: '100%',
    overflow: 'hidden',
  },
}));
