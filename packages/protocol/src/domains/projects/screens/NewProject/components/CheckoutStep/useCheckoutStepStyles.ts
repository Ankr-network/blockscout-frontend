import { makeStyles } from 'tss-react/mui';

export const useCheckoutStepStyles = makeStyles()(theme => {
  const contentGap = 30;
  const rigtPartSize = 300;
  const leftPartSize = `calc(100% - ${rigtPartSize + contentGap}px)`;

  return {
    root: {
      marginTop: theme.spacing(8),
    },
    title: {
      display: 'flex',
      marginBottom: theme.spacing(3),
    },
    description: {
      display: 'inline-flex',
      marginBottom: theme.spacing(6),
      maxWidth: 480,
    },
    content: {
      display: 'flex',
      gap: contentGap,
    },
    leftPart: {
      display: 'flex',
      flexDirection: 'column',
      width: leftPartSize,
      gap: theme.spacing(4),
    },
    rightPart: {
      display: 'flex',
      width: rigtPartSize,
    },
    section: {
      width: '100%',
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: '17px',
      padding: theme.spacing(5),
      position: 'relative',
    },
    subtitle: {
      fontSize: 14,
      marginBottom: theme.spacing(2),
      display: 'flex',
    },
    editButton: {
      position: 'absolute',
      right: theme.spacing(4),
      top: theme.spacing(4),
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },
    chainsListWrapper: {
      overflow: 'hidden',
    },
    disabledPointerEvents: {
      pointerEvents: 'none',
      marginTop: theme.spacing(6),
      padding: 0,
    },
    contractAddress: {
      display: 'flex',
      alignItems: 'center',

      color: theme.palette.success.main,

      svg: {
        color: theme.palette.success.main,
      },
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(4, 0),
    },

    planPrice: {
      '& span span': {
        marginLeft: theme.spacing(2),
      },

      '& span': {
        letterSpacing: '-0.02em',
      },

      '& span:last-of-type span': {
        color: theme.palette.primary.main,
      },
    },
    plan: {
      textTransform: 'capitalize',
    },

    chainType: {
      textTransform: 'capitalize',
    },
    whitelistBadge: {
      borderRadius: 8,
      backgroundColor: theme.palette.background.default,
      width: 'fit-content',
      padding: theme.spacing(0.5, 2),
    },
    whitelistBadgeText: {
      fontSize: 14,
    },
  };
});
