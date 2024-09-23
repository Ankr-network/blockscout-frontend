import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { CONTAINER_STYLES } from 'modules/layout/components/DefautLayout';

export const useChainItemBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    ...CONTAINER_STYLES,

    backgroundImage: 'none',
    marginBottom: theme.spacing(8),
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
