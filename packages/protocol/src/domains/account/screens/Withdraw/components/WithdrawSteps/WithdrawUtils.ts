import { IGetButtonPropsParams } from './WithdrawStepsTypes';

export const getButtonProps = ({ onDeposit }: IGetButtonPropsParams) => {
  return {
    disabled: false,
    onClick: onDeposit,
  };
};
