import { AccountingErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';
import { capitalize } from '@mui/material';
import { t } from '@ankr.com/common';

export const getAxiosAccountingErrorMessage = (
  axiosAccountError: AxiosError<AccountingErrorResponse>,
) =>
  capitalize(
    axiosAccountError.response?.data.error.message || t('error.unexpected'),
  );
