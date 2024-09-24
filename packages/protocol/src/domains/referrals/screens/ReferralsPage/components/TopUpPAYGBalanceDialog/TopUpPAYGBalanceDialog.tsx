import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { AmountInput, IAmountInputProps } from './components/AmountInput';
import { Buttons, IButtonsProps } from './components/Buttons';
import {
  IPAYGAccountCardProps,
  PAYGAccountCard,
} from './components/PAYGAccountCard';
import { topUpPAYGBalanceDialogTranslation } from './translation';
import { useTopUpPAYGBalanceDialogStyles } from './useTopUpPAYGBalanceDialogStyles';

export interface ITopUpBalanceDialogProps extends IDialogProps {
  amountInputProps: IAmountInputProps;
  buttonsProps: IButtonsProps;
  paygAccountCardProps: IPAYGAccountCardProps;
}

export const TopUpPAYGBalanceDialog = ({
  amountInputProps,
  buttonsProps,
  paygAccountCardProps,
  ...dialogProps
}: ITopUpBalanceDialogProps) => {
  const { classes } = useTopUpPAYGBalanceDialogStyles();
  const { keys, t } = useTranslation(topUpPAYGBalanceDialogTranslation);

  return (
    <Dialog {...dialogProps} classes={classes} title={t(keys.title)}>
      <AmountInput {...amountInputProps} />
      <PAYGAccountCard {...paygAccountCardProps} />
      <Buttons {...buttonsProps} />
    </Dialog>
  );
};
