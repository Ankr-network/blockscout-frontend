import { AccountErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';
import { capitalize } from '@material-ui/core';
import { t } from '@ankr.com/common';

export const getAxiosAccountErrorMessage = (
  axiosAccountError: AxiosError<AccountErrorResponse>,
) =>
  capitalize(
    axiosAccountError.response?.data.error.message ?? t('error.unexpected'),
  );
