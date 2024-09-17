import { makeStyles } from 'tss-react/mui';

export const useSearchStyles = makeStyles<boolean>()(
  (theme, hasSearchContent) => ({
    root: {
      height: 32,
      borderRadius: 12,
      paddingLeft: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,

      '& input': {
        fontSize: 14,
      },

      '& svg': {
        width: 24,
        height: 24,
      },
    },
    searchIcon: {
      color: theme.palette.grey[500],
    },
    iconButton: {
      height: 32,
      width: 32,
      border: 'none',
      visibility: hasSearchContent ? 'visible' : 'hidden',
    },
    icon: {
      '& > svg': {
        height: 20,
        width: 20,
      },
    },
  }),
);
