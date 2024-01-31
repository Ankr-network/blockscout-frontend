import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useExpiredTokenBannerStyles = makeStyles()((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(6),

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
