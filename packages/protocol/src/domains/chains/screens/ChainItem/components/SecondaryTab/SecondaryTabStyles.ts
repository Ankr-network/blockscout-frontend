import { makeStyles, Theme } from '@material-ui/core/styles';
import { TabSize } from './types';

export interface SecondaryTabStylesParams {
  isLast?: boolean;
  isSelected?: boolean;
  size: TabSize;
}

export const useSecondaryTabStyles = makeStyles<
  Theme,
  SecondaryTabStylesParams
>(theme => {
  const sizesMap: Record<TabSize, Record<string, unknown>> = {
    [TabSize.Medium]: {
      padding: `${theme.spacing(0.75)}px ${theme.spacing(2)}px`,

      borderRadius: theme.spacing(1.5),

      fontWeight: 600,
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(3)}px`,

      [theme.breakpoints.down('lg')]: {
        padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,

        letterSpacing: '0.01em',

        fontSize: theme.spacing(1.75),
        lineHeight: `${theme.spacing(2.5)}px`,
      },
    },
    [TabSize.Small]: {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,

      borderRadius: 9,

      letterSpacing: '0.01em',

      fontWeight: 500,
      fontSize: theme.spacing(1.75),
      lineHeight: `${theme.spacing(2.5)}px`,
    },
  };

  return {
    secondaryTab: ({ isLast, isSelected, size }) => ({
      height: 'auto',
      marginRight: isLast ? 0 : 2,

      transition: 'color .3s, background-color .3s, box-shadow .3s',

      ...(isSelected
        ? {
            backgroundColor: theme.palette.common.white,
            boxShadow:
              '0 0 5px rgba(31, 34, 38, 0.1), 0 0 15px rgba(31, 34, 38, 0.1)',

            color: theme.palette.primary.main,

            '&:hover': {
              backgroundColor: theme.palette.common.white,
              color: theme.palette.primary.main,
            },
          }
        : {
            backgroundColor: 'transparent',
            boxShadow: 'none',

            color: theme.palette.grey[600],

            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.grey[600],
            },
          }),
      ...sizesMap[size],
    }),
  };
});
