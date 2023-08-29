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
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1.5, 3),
      backgroundColor: theme.palette.background.default,
      whiteSpace: 'nowrap',
      fontWeight: 500,
      maxWidth: '100%',
    },
    badgeLabel: {
      display: 'inline',
      textOverflow: 'ellipsis',
      maxWidth: `calc(100% - ${iconFontSize * 2}px)`,
      overflow: 'hidden',
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
      width: 35,
      height: 35,
    },
    editIcon: {
      color: theme.palette.primary.main,
      '&&': {
        fontSize: 20,
      },
    },
  };
});
