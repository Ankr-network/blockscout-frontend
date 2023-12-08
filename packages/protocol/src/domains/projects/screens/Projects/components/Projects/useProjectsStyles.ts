import { makeStyles } from 'tss-react/mui';

export const useProjectsStyles = makeStyles()(theme => ({
  banner: {
    gridArea: 'banner',
    marginBottom: theme.spacing(5),
  },
  bannerButton: {
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
}));
