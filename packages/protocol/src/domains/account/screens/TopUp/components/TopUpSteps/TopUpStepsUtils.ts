import { TopUpStep } from 'modules/auth/actions/fetchTopUpStatus';
import { IGetButtonPropsParams } from './TopUpStepsTypes';

export const getButtonProps = ({
  step,
  loading,
  onDeposit,
}: IGetButtonPropsParams) => {
  switch (step) {
    case TopUpStep.start:
      return {
        onClick: onDeposit,
      };

    case TopUpStep.publicKey:
    case TopUpStep.allowance:
    case TopUpStep.deposit:
      return {
        disabled: loading,
        onClick: onDeposit,
      };

    case TopUpStep.waitTransactionConfirming:
      return {
        disabled: false,
        onClick: onDeposit,
      };

    case TopUpStep.done:
    default:
      return {
        disabled: false,
        onClick: onDeposit,
      };
  }
};
