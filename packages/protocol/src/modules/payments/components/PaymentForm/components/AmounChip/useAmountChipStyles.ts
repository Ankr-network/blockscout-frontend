import { chipClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useAmountChipStyles = makeStyles<boolean>()(
  (theme, isDisabled) => ({
    root: {
      [`&:has(.${chipClasses.icon})`]: {
        gap: theme.spacing(1),
      },
      [`&&.${chipClasses.root}`]: {
        [`.${chipClasses.label}`]: {
          color: isDisabled ? theme.palette.grey[400] : 'inherit',
        },
      },
    },
    icon: {
      backgroundColor: 'transparent',
      color: theme.palette.grey[400],
      height: 20,
      width: 20,
    },
  }),
);
