import { makeStyles } from 'tss-react/mui';

export const useUserEndpointsScrollbarStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 20,
  },
}));
