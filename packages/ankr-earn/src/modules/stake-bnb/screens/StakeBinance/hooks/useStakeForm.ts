import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ZERO } from 'modules/common/const';
import { floor } from 'modules/common/utils/floor';
import { stake } from 'modules/stake-bnb/actions/stake';
import { BNB_STAKING_AMOUNT_STEP } from 'modules/stake-bnb/const';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useEffect, useState } from 'react';
import { useFetchAPY } from '../../../hooks/useFetchAPY';
import { useFetchStats } from '../../../hooks/useFetchStats';
import { getAmountData } from '../../../utils/getAmountData';

interface IUseStakeFormArgs {
  openSuccessModal: () => void;
}

export const useStakeForm = ({ openSuccessModal }: IUseStakeFormArgs) => {
  const dispatchRequest = useDispatchRequest();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    error: fetchStatsError,
    isLoading: isFetchStatsLoading,
    stats: fetchStatsData,
  } = useFetchStats();

  const fetchAPYData: BigNumber = useFetchAPY();

  const [amount, setAmount] = useState(0);

  const handleFormChange = ({ amount }: IStakeFormPayload): void => {
    let rawAmount: BigNumber;

    rawAmount = new BigNumber(typeof amount === 'string' ? amount : '0');
    rawAmount = rawAmount.isNaN() ? ZERO : rawAmount;

    const relayerFee: BigNumber = fetchStatsData?.relayerFee ?? ZERO;
    const { amount: resultAmount, isLessThanOrEqualToZero } = getAmountData(
      rawAmount.toNumber(),
      relayerFee,
    );
    const resultVal: number = isLessThanOrEqualToZero
      ? 0
      : resultAmount.toNumber();

    setAmount(resultVal);
  };

  const handleSubmit = ({ amount }: IStakeSubmitPayload): void => {
    const resultAmount: BigNumber = new BigNumber(amount);

    dispatchRequest(stake(resultAmount)).then(({ error }) => {
      if (!error) {
        openSuccessModal();
      }
    });
  };

  useEffect(() => {
    if (!fetchStatsData) {
      return;
    }

    const { minimumStake, bnbBalance } = fetchStatsData;

    const initAmount = bnbBalance.isGreaterThan(minimumStake)
      ? floor(bnbBalance.toNumber(), BNB_STAKING_AMOUNT_STEP)
      : minimumStake.toNumber();

    setAmount(initAmount);
  }, [fetchStatsData]);

  return {
    amount,
    fetchAPYData,
    fetchStatsData,
    fetchStatsError,
    handleFormChange,
    handleSubmit,
    isFetchStatsLoading,
    isStakeLoading,
  };
};
