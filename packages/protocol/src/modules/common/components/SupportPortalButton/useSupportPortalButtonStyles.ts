import { makeStyles } from 'tss-react/mui';

const name = 'SupportPortalButton';

export interface IUseSupportPortalButtonStylesProps {
  isNewProjectPage: boolean;
}

export const useSupportPortalButtonStyles =
  makeStyles<IUseSupportPortalButtonStylesProps>({ name })(
    (theme, { isNewProjectPage }) => ({
      root: {
        position: 'fixed',
        // Large number is used to overlap dialog backdrop
        zIndex: 1301,
        right: 10,
        bottom: isNewProjectPage ? 90 : 20,

        height: 50,
        width: 50,
        minWidth: 50,

        borderRadius: '50%',

        fontSize: 29,

        '&:focus': {
          boxShadow: 'none',
        },

        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    }),
  );
