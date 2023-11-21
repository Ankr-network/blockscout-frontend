import { makeStyles } from 'tss-react/mui';

export const useCollapsingStringStyles = makeStyles<{ maxWidth: number }>()(
  (theme, { maxWidth }) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '100%',
    },
    rootOpened: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    wrapper: {
      display: 'inline-flex',
    },
    wrapperCollapsed: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth,
    },
    wrapperOpened: {
      flexDirection: 'column',
    },
    text: {
      wordBreak: 'break-word',
      fontSize: 14,
    },
    btn: {
      display: 'inline-flex',
      cursor: 'pointer',
      fontSize: 14,

      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    btnMore: {
      marginLeft: theme.spacing(1),
      fontSize: 14,
    },
  }),
);
