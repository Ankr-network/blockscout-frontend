import { makeStyles } from 'tss-react/mui';

export const useProjectSidebarFooterStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(3),

    padding: theme.spacing(3, 8),

    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
