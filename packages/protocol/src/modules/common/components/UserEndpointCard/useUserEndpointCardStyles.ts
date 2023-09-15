import { makeStyles } from 'tss-react/mui';

export const useUserEndpointCardStyles = makeStyles<boolean, 'view'>()(
  (theme, isSelected, classes) => {
    const baseCardStyles = {
      width: theme.spacing(51),
      height: theme.spacing(21),
      borderRadius: 20,
      padding: theme.spacing(4, 5, 0, 5),
      backgroundColor: theme.palette.background.paper,
    };

    return {
      root: {
        ...baseCardStyles,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: isSelected ? theme.palette.primary.main : 'transparent',
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        cursor: 'pointer',

        [theme.breakpoints.down('sm')]: {
          flexShrink: 0,
        },

        [`&:hover`]: {
          borderColor: isSelected ? theme.palette.primary.main : 'transparent',
          boxShadow: `0px 3px 10px rgba(0, 109, 255, 0.1)`,
        },

        [`&:hover .${classes.view}`]: {
          visibility: 'visible',
        },
      },
      skeleton: {
        ...baseCardStyles,
      },
      row: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
      },
      name: {
        color: theme.palette.grey[900],
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 700,
        width: theme.spacing(32),
        height: 32,
        maxWidth: theme.spacing(51),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      view: {
        minWidth: 40,
        minHeight: 40,
        padding: 0,
        display: 'flex',
        visibility: isSelected ? 'visible' : 'hidden',
        marginTop: -10,
        marginRight: -10,

        '& svg': {
          width: 16,
          height: 16,
        },

        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      },
      token: {
        color: theme.palette.grey[600],
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.43,
        width: theme.spacing(25),
      },
    };
  },
);
