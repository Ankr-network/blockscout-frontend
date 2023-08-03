import { makeStyles } from 'tss-react/mui';

interface ChainItemStylesProps {
  isChecked: boolean;
  disabled?: boolean;
}

export const useChainItemStyles = makeStyles<ChainItemStylesProps>()(
  (theme, { isChecked, disabled }) => ({
    label: {
      color:
        !isChecked && disabled
          ? theme.palette.text.disabled
          : theme.palette.text.primary,
    },
    checkbox: {
      marginRight: theme.spacing(2),
      width: 18,
      height: 18,
    },
  }),
);
