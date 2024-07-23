import { makeStyles } from 'tss-react/mui';

export interface IUsePublicBadgeStylesProps {
  isOnWhiteBackground?: boolean;
}

export const usePublicBadgeStyles = makeStyles<IUsePublicBadgeStylesProps>()(
  (theme, { isOnWhiteBackground }) => ({
    root: {
      height: 24,
      padding: theme.spacing(0.5, 2),

      borderRadius: 8,

      backgroundColor: theme.palette.background.paper,

      '&&:hover': isOnWhiteBackground
        ? {}
        : {
            backgroundColor: theme.palette.background.paper,
          },
    },
  }),
);
