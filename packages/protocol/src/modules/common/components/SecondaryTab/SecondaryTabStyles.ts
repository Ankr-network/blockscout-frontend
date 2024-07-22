import { buttonBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { TabSize } from './types';

export interface SecondaryTabStylesParams {
  isLast?: boolean;
  isSelected?: boolean;
  size: TabSize;
}

export const useSecondaryTabStyles = makeStyles<SecondaryTabStylesParams>()(
  (theme, props) => {
    const sizesMap: Record<TabSize, Record<string, unknown>> = {
      [TabSize.Medium]: {
        padding: theme.spacing(1.5, 4),

        fontWeight: 600,
        fontSize: theme.spacing(4),
        lineHeight: theme.spacing(6),
        height: 44,
        borderRadius: theme.spacing(3),

        [theme.breakpoints.down('lg')]: {
          padding: theme.spacing(1, 4),

          letterSpacing: '0.01em',

          fontSize: theme.spacing(3.5),
          lineHeight: theme.spacing(5),
        },
      },
      [TabSize.Small]: {
        padding: theme.spacing(1, 3),

        borderRadius: 9,

        letterSpacing: '0.01em',

        fontWeight: 500,
        fontSize: theme.spacing(3.5),
        lineHeight: theme.spacing(5),
      },
      [TabSize.ExtraSmall]: {
        padding: theme.spacing(0.5, 2),

        borderRadius: 8,

        fontWeight: 500,
        fontSize: 14,
        minWidth: 'auto',
      },
      [TabSize.Smallest]: {
        height: 28,
        padding: theme.spacing(0.5, 3),
        minWidth: 'auto',
        minHeight: 'unset',
        fontWeight: 500,
        fontSize: 14,

        '&&&': {
          borderRadius: 8,
        },

        [`&.${buttonBaseClasses.disabled}`]: {
          color: theme.palette.text.disabled,
          backgroundColor: 'transparent',
        },
      },
    };

    return {
      secondaryTab: {
        marginRight: props.isLast ? 0 : theme.spacing(0.5),

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

              // this classname is used in PromoLabel component
              '& .promo': {
                background: theme.palette.background.default,
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
