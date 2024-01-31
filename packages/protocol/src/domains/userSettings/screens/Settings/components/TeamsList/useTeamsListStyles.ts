import { makeStyles } from 'tss-react/mui';

export const useTeamsListStyles = makeStyles()(theme => ({
  userGroupsList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(3),
  },
}));
