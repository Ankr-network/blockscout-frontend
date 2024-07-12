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
      border: 'none',
      visibility: hasSearchContent ? 'visible' : 'hidden',
    },
    icon: {
      height: 20,
      width: 20,
      '& > svg': {
        height: 20,
        width: 20,
      },
    },
  }),
);
