import { makeStyles, Theme } from '@material-ui/core/styles';

export interface SecondaryTabStylesParams {
  isLast?: boolean;
  isSelected: boolean;
}

export const useSecondaryTabStyles = makeStyles<
  Theme,
  SecondaryTabStylesParams
>(theme => ({
  secondaryTab: {
    height: 'auto',
    marginRight: ({ isLast }) => (isLast ? 0 : 2),
    padding: `${theme.spacing(0.75)}px ${theme.spacing(2)}px`,

    borderRadius: theme.spacing(1.5),

    backgroundColor: ({ isSelected }) =>
      isSelected ? theme.palette.common.white : 'transparent',
    boxShadow: ({ isSelected }) =>
      isSelected
        ? '0 0 5px rgba(31, 34, 38, 0.1), 0 0 15px rgba(31, 34, 38, 0.1)'
        : 'none',

    color: ({ isSelected }) =>
      isSelected ? theme.palette.primary.main : theme.palette.grey[600],
    letterSpacing: '-0.01em',

    transition: 'color .3s, background-color .3s, box-shadow .3s',

    fontWeight: 600,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,

    '&:hover': {
      backgroundColor: ({ isSelected }) =>
        isSelected ? theme.palette.common.white : 'transparent',
      color: ({ isSelected }) =>
        isSelected ? theme.palette.primary.main : theme.palette.grey[600],
    },

    [theme.breakpoints.down('lg')]: {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,

      letterSpacing: '0.01em',

      fontSize: theme.spacing(1.75),
      lineHeight: `${theme.spacing(2.5)}px`,
    },
  },
}));
