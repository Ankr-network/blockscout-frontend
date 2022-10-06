import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
  },
}));
