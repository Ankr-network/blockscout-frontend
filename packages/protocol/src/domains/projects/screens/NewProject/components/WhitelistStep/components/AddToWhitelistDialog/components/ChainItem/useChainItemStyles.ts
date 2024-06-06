import { makeStyles } from 'tss-react/mui';

interface ChainItemStylesProps {
  isChecked: boolean;
  disabled?: boolean;
}

export const useChainItemStyles = makeStyles<ChainItemStylesProps>()(
  (theme, { disabled, isChecked }) => ({
    label: {
      lineHeight: '140%',
      fontWeight: 700,
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
