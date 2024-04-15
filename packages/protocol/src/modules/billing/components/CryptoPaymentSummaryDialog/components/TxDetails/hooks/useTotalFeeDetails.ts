import { useMemo } from 'react';

import {
  IGetTotalFeeDetails,
  getTotalFeeDetails,
} from 'modules/billing/utils/getTotalFeeDetails';

export interface IUseTotalFeeDetails extends IGetTotalFeeDetails {}

export const useTotalFeeDetails = ({
  approvalFeeDetails,
  depositFeeDetails,
}: IUseTotalFeeDetails) => {
  const totalFeeDetails = useMemo(
    () => getTotalFeeDetails({ approvalFeeDetails, depositFeeDetails }),
    [approvalFeeDetails, depositFeeDetails],
  );

  return totalFeeDetails;
};
