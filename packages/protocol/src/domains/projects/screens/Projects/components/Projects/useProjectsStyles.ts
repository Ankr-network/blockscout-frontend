import { makeStyles } from 'tss-react/mui';

export const useProjectsStyles = makeStyles()(theme => ({
  banner: {
    gridArea: 'banner',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  bannerButton: {
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
}));
