import { TopUpStep } from 'modules/auth/actions/fetchTopUpStatus';
import { IGetButtonPropsParams } from './TopUpStepsTypes';

export const getButtonProps = ({
  step,
  loading,
  onDeposit,
  onConnect,
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

    case TopUpStep.login:
      return {
        disabled: loading,
        onClick: onConnect,
      };

    case TopUpStep.waitTransactionConfirming:
      return {
        // disabled: true,
        // onClick: () => undefined,
        disabled: false,
        onClick: onDeposit,
      };

    case TopUpStep.done:
    default:
      return {
        disabled: true,
        onClick: () => undefined,
      };
  }
};
