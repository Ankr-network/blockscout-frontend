import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useGetStartedSectionStyles = makeStyles()((theme: Theme) => ({
  getStartedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7.5),
    paddingTop: theme.spacing(7),
  },
  requestComposer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
