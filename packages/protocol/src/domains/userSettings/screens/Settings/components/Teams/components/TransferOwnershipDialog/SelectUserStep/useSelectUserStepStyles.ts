import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useSelectUserStepStyles = makeStyles()(theme => {
  const isLight = isLightTheme(theme);

  return {
    description: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(6),
    },
    noticeRoot: {
      width: '100%',
      padding: theme.spacing(4),
      backgroundColor: theme.palette.primary.light,

      color: isLight
        ? theme.palette.grey[900]
        : theme.palette.background.default,
      borderRadius: 16,
    },
    selectRoot: {
      marginBottom: theme.spacing(6),
    },
    select: {
      paddingLeft: theme.spacing(4),
      '&:focus': {
        backgroundColor: 'unset',
      },
    },
    valueRoot: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(3),
    },
    valueIcon: {
      marginRight: theme.spacing(2),
    },
    optionRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItem: {
      '&&': {
        padding: theme.spacing(1),
        borderBottom: 'none',
      },
    },
    li: {
      '&::marker': {
        marginRight: theme.spacing(2),
      },
    },
    noticeTitle: {
      marginBottom: theme.spacing(1),
    },
  };
});
