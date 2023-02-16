import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { millisecondsToSeconds } from 'date-fns';

import { IAmountType } from 'multirpc-sdk';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { useFetchUserTransactionsQuery } from 'modules/clients/actions/fetchUserTransactions';
import { useAddUserVoucherCreditsMutation } from 'modules/clients/actions/addUserVoucherCredits';
import { useSubtractUserVoucherCreditsMutation } from 'modules/clients/actions/subtractUserVoucherCredits';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

export const FORM_ELEMENT_EXPIRATION = 'validDuringDays';
export const FORM_ELEMENT_COMMENT = 'comment';
export const ADD_CREDITS_ID = 'add';
export const SUBTRACT_CREDITS_ID = 'subtract';

interface IFormElements {
  elements: {
    [FORM_ELEMENT_COMMENT]: { value: string };
    [FORM_ELEMENT_EXPIRATION]: { value: string };
  };
}

export const useClientBalancesModalContent = (
  currentClient: ClientMapped,
  onClose: () => void,
) => {
  const [addUserVoucherCredits, { isLoading: isLoadingAddCredits }] =
    useAddUserVoucherCreditsMutation();
  const [subtractUserVoucherCredits, { isLoading: isLoadingSubtractCredits }] =
    useSubtractUserVoucherCreditsMutation();
  const { refetch: refetchClients } = useFetchCountersQuery();
  const { refetch: refetchTransactions } = useFetchUserTransactionsQuery({
    address: currentClient.address!,
  });

  const isLoading = isLoadingAddCredits || isLoadingSubtractCredits;

  const [amount, setAmount] = useState<number | undefined>(undefined);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & {
      target: IFormElements;
      nativeEvent: SubmitEvent;
    },
  ) => {
    e.preventDefault();

    // getting id of submit button for add or subtract credits
    const submitterId = e.nativeEvent.submitter?.id as
      | typeof ADD_CREDITS_ID
      | typeof SUBTRACT_CREDITS_ID
      | undefined;

    const {
      comment: { value: commentValue },
      validDuringDays: { value: validDuringDaysValue },
    } = e.target.elements;

    if (!currentClient.address) {
      toast.error("Can't find user address");
      return;
    }

    if (!amount) {
      toast.error('amount field is required');
      return;
    }

    let expiresAt = '0';
    if (validDuringDaysValue) {
      if (+validDuringDaysValue > 30) {
        toast.error('maximum is 30 days');
        return;
      }
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + +validDuringDaysValue);
      const expiresAtSeconds = Math.floor(
        millisecondsToSeconds(newDate.getTime()),
      );
      expiresAt = expiresAtSeconds.toString();
    }

    const requestParams = {
      address: currentClient.address,
      amountType: 'credit' as IAmountType,
      amount: amount.toString(),
      reasonId: `${Date.now()} ${commentValue || ''}`,
      expiresAt,
    };

    const handleResponse = (res: any) => {
      if ('data' in res && res.data.success) {
        refetchClients();
        refetchTransactions();
        onClose();
      }
    };

    if (submitterId === ADD_CREDITS_ID) {
      addUserVoucherCredits(requestParams).then(handleResponse);
    }

    if (submitterId === SUBTRACT_CREDITS_ID) {
      subtractUserVoucherCredits(requestParams).then(handleResponse);
    }
  };

  return {
    handleSubmit,
    isLoading,
    amount,
    setAmount,
  };
};
