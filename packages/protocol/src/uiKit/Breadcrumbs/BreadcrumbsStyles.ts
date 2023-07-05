import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, shouldShowMobileBreadcrumbs: boolean) => ({
    link: shouldShowMobileBreadcrumbs
      ? {
          cursor: 'pointer',
          fontSize: 28,
          fontWeight: 'bold',
          lineHeight: 1.167,
          color: theme.palette.grey[900],
          '&.custom-link:hover': {
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
          fontSize: 28,
          fontWeight: 'bold',
          lineHeight: 1.167,
          letterSpacing: '-0.02em',
          color: theme.palette.grey[600],
          '&.custom-link:hover': {
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
      color: theme.palette.grey[500],
      fontSize: 10,
      display: shouldShowMobileBreadcrumbs ? 'none' : 'flex',

      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    muiSeparator: {
      [theme.breakpoints.down('md')]: {
        margin: 0,
      },
    },
    breadcrumbsRoot: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    breadcrumbs: {
      flexWrap: 'nowrap',
      alignItems: 'center',
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
      fontSize: 28,
      lineHeight: 1.167,
      color: theme.palette.grey[900],
    },
    mobileBackButton: {
      fontSize: 20,
      color: theme.palette.grey[500],
      transform: 'rotate(180deg)',
      marginLeft: -4,
    },
  }),
);
