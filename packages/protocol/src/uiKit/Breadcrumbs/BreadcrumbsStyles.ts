import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, shouldShowMobileBreadcrumbs: boolean) => ({
    link: shouldShowMobileBreadcrumbs
      ? {
          cursor: 'pointer',
          fontSize: 30,
          fontWeight: 'bold',
          lineHeight: 1.167,
          '&.custom-link:hover': {
            color: theme.palette.primary.main,
          },
          /* just icon "back" for breadcrumbs link */

          padding: 10,
          border: `1px solid ${theme.palette.grey[200]}`,
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          cursor: 'pointer',
          fontSize: 30,
          fontWeight: 'bold',
          lineHeight: 1.167,
          '&.custom-link:hover': {
            color: theme.palette.primary.main,
          },
          /* just icon "back" for breadcrumbs link */
          [theme.breakpoints.down('md')]: {
            padding: 10,
            border: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },

    separator: {
      fontSize: 22,
      display: shouldShowMobileBreadcrumbs ? 'none' : 'flex',

      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
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
    typography: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 30,
      lineHeight: 1.167,
    },
    mobileBackButton: {
      transform: 'rotate(180deg)',
    },
  }),
);
