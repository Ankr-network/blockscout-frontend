import { Theme, makeStyles } from '@material-ui/core';

export const useGetStartedSectionStyles = makeStyles<Theme>(theme => ({
  getStartedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    paddingTop: theme.spacing(3.75),
  },
}));
