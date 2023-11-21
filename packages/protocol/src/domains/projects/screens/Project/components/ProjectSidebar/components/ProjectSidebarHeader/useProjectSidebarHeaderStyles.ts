import { makeStyles } from 'tss-react/mui';

export const useProjectSidebarHeaderStyles = makeStyles<boolean>()(
  (theme, hasBackButton) => ({
    root: {
      zIndex: 1,

      display: 'flex',
      justifyContent: hasBackButton ? 'space-between' : 'flex-end',

      marginBottom: hasBackButton ? theme.spacing(4) : undefined,
      padding: theme.spacing(8, 8, 0),
    },
    iconButton: {
      position: hasBackButton ? undefined : 'absolute',

      borderRadius: 12,
    },
    icon: {
      color: theme.palette.text.secondary,
    },
  }),
);
