import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainSubtitleStyles = makeStyles()((theme: Theme) => ({
  chainSubtitle: {
    display: 'flex',
    gap: theme.spacing(2 * 1),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  description: {
    fontWeight: 400,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),
  },
  archiveLabel: {
    display: 'flex',
    alignItems: 'center',

    borderRadius: theme.spacing(2 * 1),

    fontWeight: 400,
    fontSize: theme.spacing(2 * 1.75),
    lineHeight: theme.spacing(2 * 2.5),
  },
}));
