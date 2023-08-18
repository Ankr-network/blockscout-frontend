import { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import {
  IUpdateUserEmailRequest,
  IUpdateUserEmailResponse,
} from 'multirpc-sdk';

export const handleUpdateUserEmailResponse = async (
  _: IUpdateUserEmailRequest,
  {
    queryFulfilled,
  }: MutationLifecycleApi<
    IUpdateUserEmailRequest,
    BaseQueryFn,
    IUpdateUserEmailResponse
  >,
) => {
  queryFulfilled
    .then(res => {
      const { data } = res;

      if (data.binding.email) {
        toast.success(`Updated user email for ${data.binding.address}`);
      } else {
        toast.error(`Failed to update user email for ${data.binding.address}`);
      }

      return data;
    })
    .catch((error: Error) => {
      toast.error({ message: error.message });
      throw error;
    });
};
