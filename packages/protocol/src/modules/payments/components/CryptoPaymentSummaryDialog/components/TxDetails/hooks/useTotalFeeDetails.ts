import { useMemo } from 'react';

import {
  IGetTotalFeeDetails,
  getTotalFeeDetails,
} from 'modules/payments/utils/getTotalFeeDetails';

export interface IUseTotalFeeDetails extends IGetTotalFeeDetails {}

export const useTotalFeeDetails = ({
  allowanceFeeDetails,
  depositFeeDetails,
}: IUseTotalFeeDetails) => {
  const totalFeeDetails = useMemo(
    () => getTotalFeeDetails({ allowanceFeeDetails, depositFeeDetails }),
    [allowanceFeeDetails, depositFeeDetails],
  );

  return totalFeeDetails;
};
