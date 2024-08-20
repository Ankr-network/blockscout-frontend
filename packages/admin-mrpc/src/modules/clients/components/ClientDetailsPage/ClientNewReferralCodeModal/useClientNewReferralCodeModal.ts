import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { INewReferralCodeRequest } from 'multirpc-sdk';

import { useModal } from 'modules/common/hooks/useModal';
import { useCreateNewReferralCodeMutation } from 'modules/clients/actions/createNewReferralCode';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

interface FormElements {
  elements: {
    name: { value: string };
    validFrom: { value: string };
    validUntil: { value: string };
    bundleId: { value: string };
    voucherCurrency: { value: string };
    voucherAmount: { value: string };
    voucherExpiresAt: { value: string };
  };
}

const EMPTY_STRING = '';
const ZERO_NUMBER = 0;

/* eslint-disable max-lines-per-function */
export const useClientNewReferralCodeModal = (currentClient: ClientMapped) => {
  const [createNewReferralCode, { isLoading: isCreateNewReferralCodeLoading }] =
    useCreateNewReferralCodeMutation();

  const { open, handleOpen, handleClose } = useModal();

  const [nameValue, setNameValue] = useState(EMPTY_STRING);
  const [validFromValue, setValidFrom] = useState(ZERO_NUMBER);
  const [validUntilValue, setValidUntil] = useState(ZERO_NUMBER);
  const [bundleIdValue, setBundleId] = useState(EMPTY_STRING);
  const [voucherCurrencyValue, setVoucherCurrency] = useState(EMPTY_STRING);
  const [voucherAmountValue, setVoucherAmount] = useState(EMPTY_STRING);
  const [voucherExpiresAtValue, setVoucherExpiresAt] = useState(ZERO_NUMBER);

  useEffect(() => {
    setBundleId(EMPTY_STRING);
    setValidFrom(ZERO_NUMBER);
    setValidUntil(ZERO_NUMBER);
    setNameValue(EMPTY_STRING);
    setVoucherCurrency(EMPTY_STRING);
    setVoucherAmount(EMPTY_STRING);
    setVoucherExpiresAt(ZERO_NUMBER);
  }, []);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & {
      target: FormElements;
    },
  ) => {
    e.preventDefault();

    const {
      name: { value: name },
      validFrom: { value: validFrom },
      validUntil: { value: validUntil },
      bundleId: { value: bundleId },
      voucherCurrency: { value: voucherCurrency },
      voucherAmount: { value: voucherAmount },
      voucherExpiresAt: { value: voucherExpiresAt },
    } = e.target.elements;

    const validFromNumber = +validFrom;
    const validUntilNumber = +validUntil;
    const voucherExpiresAtNumber = +voucherExpiresAt;

    if (!currentClient.address) {
      toast.error("Can't find user address");

      return;
    }

    let requestParams: INewReferralCodeRequest = {
      address: currentClient.address,
      name,
    };

    if (
      validFromNumber &&
      validFromNumber > ZERO_NUMBER &&
      validUntilNumber &&
      validUntilNumber > ZERO_NUMBER
    ) {
      requestParams = {
        ...requestParams,
        bonus: {
          valid_from: validFromNumber,
          valid_until: validUntilNumber,
        },
      };
    }

    if (bundleId && bundleId !== EMPTY_STRING) {
      requestParams = {
        ...requestParams,
        bonus: {
          ...requestParams.bonus,
          bundle_id: bundleId,
        },
      };
    }

    if (
      voucherCurrency &&
      voucherCurrency !== EMPTY_STRING &&
      voucherAmount &&
      voucherAmount !== EMPTY_STRING &&
      voucherExpiresAtNumber &&
      voucherExpiresAtNumber > ZERO_NUMBER
    ) {
      requestParams = {
        ...requestParams,
        bonus: {
          ...requestParams.bonus,
          voucher: {
            currency: voucherCurrency,
            amount: voucherAmount,
            expires_at: voucherExpiresAtNumber,
          },
        },
      };
    }

    const handleResponse = (res: any) => {
      if (
        typeof res?.data?.user === 'object' &&
        res?.data?.user !== null &&
        'id' in res.data.user
      ) {
        handleClose();
      }
    };

    createNewReferralCode(requestParams).then(handleResponse);
  };

  const onInputNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setNameValue(event.target.value);
  };

  const onInputBundleIdChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setBundleId(event.target.value);
  };

  const onInputValidFromChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setValidFrom(+event.target.value);
  };

  const onInputValidUntilChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setValidUntil(+event.target.value);
  };

  const onInputVoucherCurrencyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setVoucherCurrency(event.target.value);
  };

  const onInputVoucherAmountChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setVoucherAmount(event.target.value);
  };

  const onInputExpiresAtChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setVoucherExpiresAt(+event.target.value);
  };

  return {
    open,
    handleSubmit,
    isLoading: isCreateNewReferralCodeLoading,
    nameValue,
    onInputNameChange,
    validFromValue,
    onInputValidFromChange,
    validUntilValue,
    onInputValidUntilChange,
    bundleIdValue,
    onInputBundleIdChange,
    voucherCurrencyValue,
    onInputVoucherCurrencyChange,
    voucherAmountValue,
    onInputVoucherAmountChange,
    voucherExpiresAtValue,
    onInputExpiresAtChange,
    handleClose,
    handleOpen,
  };
};
