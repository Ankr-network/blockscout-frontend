import { makeStyles } from 'tss-react/mui';

export const useBreadcrumbsStyles = makeStyles<boolean>()(
  (theme, shouldShowMobileBreadcrumbs) => ({
    link: shouldShowMobileBreadcrumbs
      ? {
          cursor: 'pointer',
          color: theme.palette.grey[400],
          '&.custom-link:hover': {
            textDecoration: 'none',

            color: theme.palette.primary.main,
          },
          /* just icon "back" for breadcrumbs link */

          padding: 10,
          width: 36,
          height: 36,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          cursor: 'pointer',
          color: theme.palette.grey[900],

          display: 'flex',
          height: 22,

          '&.custom-link:hover': {
            textDecoration: 'none',

            color: theme.palette.primary.main,
          },
          /* just icon "back" for breadcrumbs link */
          [theme.breakpoints.down('md')]: {
            padding: 10,
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },

    separator: {
      color: theme.palette.grey[400],
      width: 10,
      height: 10,
      strokeWidth: 1.5,
      display: shouldShowMobileBreadcrumbs ? 'none' : 'flex',

      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    mobileBackButton: {
      color: theme.palette.grey[400],
      transform: 'rotate(180deg)',
      marginLeft: -4,
      width: 10,
      height: 10,
      strokeWidth: 1.5,
    },
    muiSeparator: shouldShowMobileBreadcrumbs
      ? {
          margin: 0,
        }
      : {},
    breadcrumbsRoot: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    breadcrumbs: {
      flexWrap: 'nowrap',
      alignItems: 'baseline',
    },
    breadcrumbsLi: {
      overflow: 'hidden',
      flexShrink: 0,

      '&:last-child': {
        flexShrink: 1,
      },
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: theme.palette.grey[400],
    },
    breadcrumbsTitle: {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2.5),
    },
    chip: {
      borderRadius: 8,
      padding: theme.spacing(0.5, 2),
      height: 24,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);
