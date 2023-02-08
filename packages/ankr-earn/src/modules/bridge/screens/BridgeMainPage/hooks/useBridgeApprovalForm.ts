import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  RECEIPT_NAME,
  useApproveBridgeMutation,
} from 'modules/bridge/actions/approve';
import { useLazyGetABRatioQuery } from 'modules/bridge/actions/getMaticABRatio';
import { useLazyGetBridgeAllowanceQuery } from 'modules/bridge/actions/lazyGetBridgeAllowance';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { getTokenAddr } from 'modules/bridge/utils/getTokenAddr';
import { SupportedChainIDS, ZERO } from 'modules/common/const';
import { convertFromWei } from 'modules/common/utils/numbers/convertFromWei';
import { convertToWei } from 'modules/common/utils/numbers/convertToWei';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';
import { useApprovalForm } from 'modules/stake/components/ApprovalFormButtons/useApprovalForm';

interface IUseBridgeApprovalForm {
  token: AvailableBridgeTokens;
  fromChainId: SupportedChainIDS;
  isActualNetwork: boolean;
}

export const useBridgeApprovalForm = ({
  token,
  fromChainId,
  isActualNetwork,
}: IUseBridgeApprovalForm): IUseApprovalForm => {
  const [
    approveAction,
    {
      isLoading: isApproveLoading,
      reset: resetApprove,
      data: approveData,
      isError: isApproveError,
    },
  ] = useApproveBridgeMutation();

  const [
    getAllowance,
    { data: initialAllowance, isFetching: isAllowanceLoading },
  ] = useLazyGetBridgeAllowanceQuery();

  const [getABRatio, { data: aBRatio }] = useLazyGetABRatioQuery();

  useProviderEffect(() => {
    getABRatio();
  }, [getABRatio]);

  const allowanceWei = convertToWei(initialAllowance ?? ZERO);

  const aBRatioWei = convertToWei(aBRatio ?? ZERO);

  // We need this hack because aMATICb smart contract has rounding issues for allowance
  const multipliedAllowance =
    token === AvailableBridgeTokens.aMATICb
      ? convertFromWei(
          allowanceWei
            .multipliedBy(aBRatioWei)
            .decimalPlaces(0, BigNumber.ROUND_UP)
            .dividedBy(aBRatioWei)
            .decimalPlaces(0, BigNumber.ROUND_DOWN)
            .toString(),
        )
      : initialAllowance;

  const approve = useCallback(
    amount =>
      approveAction({
        amount,
        token,
        fromChainId,
      }),
    [approveAction, token, fromChainId],
  );

  const getAllowanceCb = useCallback(() => {
    const tokenAddr = getTokenAddr(token, fromChainId);
    getAllowance(tokenAddr);
  }, [getAllowance, token, fromChainId]);

  useEffect(() => {
    if (isActualNetwork) {
      getAllowanceCb();
    }
  }, [token, getAllowanceCb, isActualNetwork]);

  return useApprovalForm({
    isApproveLoading,
    isApproveError,
    amount: approveData?.amount,
    receiptName: RECEIPT_NAME,
    initialAllowance: multipliedAllowance,
    isAllowanceLoading,
    approve,
    resetApprove,
    getAllowance: getAllowanceCb,
    shouldFetchAllowance: isActualNetwork,
  });
};
