import { makeStyles } from 'tss-react/mui';
import { buttonBaseClasses, menuItemClasses } from '@mui/material';

interface MenuButtonStylesProps {
  isLightTheme?: boolean;
  isOpened?: boolean;
}

export const useMenuButtonStyles = makeStyles<MenuButtonStylesProps>()(
  (theme, { isLightTheme, isOpened }) => {
    let moreButtonColor = theme.palette.common.white;

    if (isLightTheme) {
      moreButtonColor = theme.palette.common.black;
    }

    if (isOpened) {
      moreButtonColor = theme.palette.primary.main;
    }

    return {
      menuButton: {
        width: 40,
        height: 40,
        padding: theme.spacing(2),
        borderRadius: 14,
        color: isLightTheme
          ? theme.palette.common.black
          : theme.palette.common.white,
        backgroundColor: isOpened
          ? theme.palette.grey[100]
          : theme.palette.background.paper,

        '& > svg': {
          color: moreButtonColor,
        },

        '&:hover': {
          backgroundColor: theme.palette.grey[100],
          '& > svg': {
            color: theme.palette.primary.main,
          },
        },

        '&:active': {
          backgroundColor: theme.palette.grey[100],
          '& > svg': {
            color: theme.palette.primary.main,
          },
        },

        [`&.${buttonBaseClasses.focusVisible}`]: {
          backgroundColor: theme.palette.grey[100],
          '& > svg': {
            color: theme.palette.primary.main,
          },
        },
      },
      menuItem: {
        padding: theme.spacing(2),
        width: '100%',

        borderRadius: 14,

        letterSpacing: '-0.01em',
        color: theme.palette.grey[900],

        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',

        [`&.${menuItemClasses.selected}`]: {
          width: '100%',

          backgroundColor: theme.palette.background.default,

          color: theme.palette.primary.main,

          fontWeight: 600,
        },

        '&:hover': {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.grey[100],
        },
      },
      menuItemIcon: {
        '&&': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.grey[600],
        },
      },
      menuItemText: {
        lineHeight: '140%',
        letterSpacing: '-0.16px',
      },
      paper: {
        borderRadius: 17,
        padding: '4px',
        width: 109,
        transform: 'translateY(12px)',
        boxShadow:
          '0px 3px 15px 0px rgba(31, 34, 38, 0.10), 0px 2px 5px 0px rgba(31, 34, 38, 0.10)',
      },
    };
  },
);
