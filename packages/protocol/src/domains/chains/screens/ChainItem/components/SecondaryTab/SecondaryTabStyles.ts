import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { TabSize } from './types';

export interface SecondaryTabStylesParams {
  isLast?: boolean;
  isSelected?: boolean;
  size: TabSize;
}

export const useSecondaryTabStyles = makeStyles<SecondaryTabStylesParams>()(
  (theme: Theme, props: SecondaryTabStylesParams) => {
    const sizesMap: Record<TabSize, Record<string, unknown>> = {
      [TabSize.Medium]: {
        padding: theme.spacing(2 * 0.75, 2 * 2),

        fontWeight: 600,
        fontSize: theme.spacing(2 * 2),
        lineHeight: theme.spacing(2 * 3),
        height: 44,
        borderRadius: theme.spacing(3),

        [theme.breakpoints.down('lg')]: {
          padding: theme.spacing(2 * 0.5, 2 * 2),

          letterSpacing: '0.01em',

          fontSize: theme.spacing(2 * 1.75),
          lineHeight: theme.spacing(2 * 2.5),
        },
      },
      [TabSize.Small]: {
        padding: theme.spacing(2 * 0.5, 2 * 1.5),

        borderRadius: 9,

        letterSpacing: '0.01em',

        fontWeight: 500,
        fontSize: theme.spacing(2 * 1.75),
        lineHeight: theme.spacing(2 * 2.5),
      },
    };

    return {
      secondaryTab: {
        marginRight: props.isLast ? 0 : theme.spacing(2 * 0.25),

        transition: 'color .3s, background-color .3s, box-shadow .3s',

        ...(props.isSelected
          ? {
              backgroundColor: theme.palette.background.paper,
              boxShadow:
                '0 0 5px rgba(31, 34, 38, 0.1), 0 0 15px rgba(31, 34, 38, 0.1)',

              color: theme.palette.primary.main,

              '&:hover': {
                backgroundColor: theme.palette.background.paper,

                color: theme.palette.primary.main,
              },

              '&.Mui-disabled': {
                backgroundColor: theme.palette.background.paper,

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

              '&.Mui-disabled': {
                backgroundColor: 'transparent',
                color: theme.palette.grey[600],
              },
            }),
        ...sizesMap[props.size],
      },
    };
  },
);
