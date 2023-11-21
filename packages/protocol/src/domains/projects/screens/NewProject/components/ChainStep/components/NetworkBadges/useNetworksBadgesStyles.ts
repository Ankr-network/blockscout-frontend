import { makeStyles } from 'tss-react/mui';

export const useNetworksBadgesStyles = makeStyles()(theme => {
  const iconFontSize = 12;

  return {
    badgesWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing(1),
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',

      maxWidth: '100%',
      maxHeight: 30,
      padding: theme.spacing(1, 3),

      borderRadius: 12,

      backgroundColor: theme.palette.background.default,

      whiteSpace: 'nowrap',

      fontWeight: 500,
    },
    badgeLabel: {
      display: 'inline',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: theme.palette.text.secondary,

      letterSpacing: '-0.01em',
      lineHeight: '140%',
    },
    selectedBadgeLabel: {
      color: theme.palette.text.primary,
    },
    closeIcon: {
      '&&': {
        fontSize: iconFontSize,
      },
    },
    closeButton: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(1),
      width: 'auto',
      height: 'auto',
    },
    editButton: {
      width: 30,
      height: 30,
      border: 'none',
      borderRadius: 12,
    },
    editIcon: {
      color: theme.palette.primary.main,
      '&&': {
        fontSize: 20,
      },
    },
  };
});
