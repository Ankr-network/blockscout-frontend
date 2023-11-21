import { makeStyles } from 'tss-react/mui';

export const useAddWhitelistMenuStyles = makeStyles<boolean>()(
  (theme, hasBottomLocation) => ({
    paper: {
      width: 193,
      marginTop: hasBottomLocation ? theme.spacing(2) : 0,
      padding: theme.spacing(1),

      borderRadius: 17,

      boxShadow:
        '0px 3px 15px 0px rgba(31, 34, 38, 0.10), 0px 2px 5px 0px rgba(31, 34, 38, 0.10)',

      transform: 'translateY(12px)',
    },
  }),
);
