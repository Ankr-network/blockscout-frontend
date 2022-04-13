import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPaymentHistory } from 'domains/account/actions/fetchPaymentHistory';
import { IPaymentHistoryEntity } from 'multirpc-sdk';
import { UsePaymentHistoryTableUtilsParams } from './PaymentsHistoryTableUtils';

export interface PaymentsHistoryTableProps {
  data?: ResponseData<typeof fetchPaymentHistory>;
  onChangePage?: (params: UsePaymentHistoryTableUtilsParams) => void;
  onSort?: (params: UsePaymentHistoryTableUtilsParams) => void;
  isMoreLoading?: boolean;
  isLoading?: boolean;
  overlayLoading?: boolean;
  defaultParams: UsePaymentHistoryTableUtilsParams;
}

export interface PaymentHistoryRowType extends IPaymentHistoryEntity {}
