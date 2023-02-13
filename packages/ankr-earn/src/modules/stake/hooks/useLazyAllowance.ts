import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';

interface ILazyApprovalArgs<QueryType> {
  useLazyAllowanceQuery: QueryType;
  approvedAllowance?: BigNumber;
  isApproveLoading: boolean;
}

interface ILazyApproval {
  allowance: BigNumber;
  isAllowanceLoading: boolean;
}

export const useLazyAllowance = <QueryType extends UseLazyQuery<never>>({
  useLazyAllowanceQuery,
  approvedAllowance = ZERO,
  isApproveLoading,
}: ILazyApprovalArgs<QueryType>): ILazyApproval => {
  const [, { data: initialAllowance, isLoading: isAllowanceLoading }] =
    useLazyAllowanceQuery();

  const [allowance, setAllowance] = useState<BigNumber>(ZERO);

  useProviderEffect(() => {
    if (!isAllowanceLoading) {
      setAllowance(initialAllowance ?? ZERO);
    }
  }, [isAllowanceLoading, setAllowance]);

  useProviderEffect(() => {
    if (!isApproveLoading) {
      setAllowance(approvedAllowance);
    }
  }, [isApproveLoading, setAllowance]);

  return {
    allowance,
    isAllowanceLoading,
  };
};
