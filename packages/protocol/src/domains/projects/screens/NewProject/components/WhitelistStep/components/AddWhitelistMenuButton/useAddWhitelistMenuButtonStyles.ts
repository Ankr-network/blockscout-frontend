import { buttonBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface AddWhitelistMenuButtonStylesProps {
  isLightTheme?: boolean;
  isOpened?: boolean;
  isSetupMode: boolean;
}

export const useAddWhitelistMenuButtonStyles =
  makeStyles<AddWhitelistMenuButtonStylesProps>()(
    (theme, { isLightTheme, isOpened, isSetupMode }) => {
      const color = isLightTheme
        ? theme.palette.primary.main
        : theme.palette.primary.dark;

      return {
        paper: {
          width: 193,
          borderRadius: 17,
          padding: theme.spacing(1),
          transform: 'translateY(12px)',
          boxShadow:
            '0px 3px 15px 0px rgba(31, 34, 38, 0.10), 0px 2px 5px 0px rgba(31, 34, 38, 0.10)',
          marginTop: isSetupMode ? theme.spacing(2) : 0,
        },
        menuButton: {
          height: isSetupMode ? 48 : 40,
          padding: isSetupMode
            ? theme.spacing(3, 5, 3, 6)
            : theme.spacing(2, 3, 2, 4),
          border: `2px solid ${theme.palette.grey[100]}`,
          borderRadius: 14,
          backgroundColor: isOpened
            ? theme.palette.grey[100]
            : theme.palette.background.paper,

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
        menuButtonLabel: {
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(2),
          color,
        },
        menuButtonIcon: {
          color,

          transition: 'transform 200ms',

          transform: isOpened ? 'rotate(180deg)' : 'none',
          transformOrigin: '50% 50%',
        },
        menuItem: {},
      };
    },
  );
