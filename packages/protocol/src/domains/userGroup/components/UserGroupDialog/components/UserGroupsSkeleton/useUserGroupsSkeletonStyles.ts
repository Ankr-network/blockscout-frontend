import { makeStyles } from 'tss-react/mui';

export const useUserGroupsSkeletonStyles = makeStyles()(theme => ({
  skeleton: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  item: {
    borderRadius: 20,
    width: '100%',
    height: 120,
  },
}));
