import { makeStyles } from 'tss-react/mui';

export const useChainsItemBaseStyles = makeStyles<boolean>()(
  (theme, isHighlighted) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      height: '100%',
      padding: theme.spacing(5),

      borderRadius: 32,
      border: isHighlighted
        ? `2px solid ${theme.palette.primary.main}`
        : undefined,

      background: theme.palette.background.paper,

      cursor: 'pointer',

      '&:hover $button': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
);
