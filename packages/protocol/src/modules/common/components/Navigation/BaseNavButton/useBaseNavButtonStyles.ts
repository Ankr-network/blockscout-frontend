import { makeStyles } from 'tss-react/mui';
import { svgIconClasses } from '@mui/material';

import { premiumTextStyles } from 'uiKit/Theme/themeUtils';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

interface IBaseNavButtonProps {
  isLightTheme: boolean;
  isMobileSideBar: boolean;
}

export const useBaseNavButtonStyles = makeStyles<IBaseNavButtonProps>()(
  (theme, { isLightTheme, isMobileSideBar }) => ({
    navBarLink: {
      width: '100%',
      height: 48,
      color: theme.palette.grey[600],
      justifyContent: 'flex-start',
      padding: theme.spacing(3),
      fontWeight: 400,
      cursor: 'pointer',
      position: 'relative',
      gap: theme.spacing(3),

      [`&& .${svgIconClasses.root}`]: {
        strokeWidth: 1.5,
      },

      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        color: theme.palette.text.secondary,
        '&:after': {
          content: '""',
          display: isMobileSideBar ? 'none' : 'flex',
          position: 'absolute',
          background: theme.palette.background.default,
          height: 2,
          bottom: 0,
          left: 45,
          width: 'calc(90% - 45px)',
        },
      },
      [`&.Mui-disabled`]: {
        '&&': {
          backgroundColor: 'transparent',
          color: theme.palette.grey[400],
          fontWeight: 400,
          '& svg': {
            color: 'inherit',
            backgroundColor: 'inherit',
          },
        },
      },
    },
    comingSoon: {
      backgroundColor: 'transparent',
      color: theme.palette.grey[400],
      fontWeight: 400,
      '& svg': {
        color: 'inherit',
        backgroundColor: 'inherit',
      },
    },
    soon: {
      verticalAlign: 'text-bottom',
      position: 'relative',
      ...premiumTextStyles,
    },
    newLabelWrapper: {
      marginLeft: theme.spacing(2),
      backgroundColor: isReactSnap
        ? 'transparent'
        : theme.palette.background.default,
      borderRadius: theme.spacing(2),
    },
    disabled: {
      '&&': {
        cursor: 'default',
        color: theme.palette.grey[isLightTheme ? 400 : 700],
        backgroundColor: 'transparent',
        fontWeight: 400,
      },
    },
    activeLink: {
      '&&': {
        color: theme.palette.primary.main,
        cursor: 'default',
        fontWeight: 600,
        background: theme.palette.background.default,
        '&& svg': {
          strokeWidth: 2,
          strokeLinejoin: 'round',
        },
      },
    },
    newLinkWrapper: {
      '&:hover': {
        '& > div': {
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
    amount: {
      height: 20,
      width: 20,
      position: 'absolute',
      right: 12,
    },
  }),
);
