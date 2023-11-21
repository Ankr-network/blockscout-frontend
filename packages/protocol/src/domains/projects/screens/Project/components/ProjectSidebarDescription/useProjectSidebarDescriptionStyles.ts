import { makeStyles } from 'tss-react/mui';

export const useProjectSidebarDescriptionStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.secondary,

    letterSpacing: '-0.01em',

    lineHeight: '140%',
  },
}));
