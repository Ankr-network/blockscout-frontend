import { makeStyles } from 'tss-react/mui';

export const useSearchStyles = makeStyles<boolean>()(
  (theme, hasSearchContent) => ({
    root: {
      backgroundColor: theme.palette.background.paper,

      '& svg': {
        width: 24,
        height: 24,
      },
    },
    searchIcon: {
      color: theme.palette.grey[500],
    },
    iconButton: {
      border: 'none',
      visibility: hasSearchContent ? 'visible' : 'hidden',
    },
  }),
);
