import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { CONTENT_WIDTH } from 'modules/layout/components/DefautLayout';

export const useChainItemBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    maxWidth: CONTENT_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',

    backgroundImage: 'none',
    marginBottom: theme.spacing(10),
    display: 'block',

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
