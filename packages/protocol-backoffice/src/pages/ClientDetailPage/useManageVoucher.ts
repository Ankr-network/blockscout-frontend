import { notification } from 'antd';
import {
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
} from 'multirpc-sdk';
import { useCallback, useState } from 'react';
import { ClientEntity } from 'stores/useClients/types';

interface IUseVoucherModalProps {
  address: ClientEntity['address'];
  onSuccess: () => void;
  voucherRequest: (
    data: IUpdateVoucherCreditsRequest | IAddVoucherCreditsRequest,
  ) => typeof data extends IUpdateVoucherCreditsRequest
    ? Promise<IUpdateVoucherCreditsResponse>
    : Promise<IAddVoucherCreditsResponse>;
}

export const useVoucherModal = ({
  address,
  onSuccess,
  voucherRequest,
}: IUseVoucherModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const onOk = useCallback(
    (formData: IUpdateVoucherCreditsRequest) => {
      setModalLoading(true);

      voucherRequest(formData)
        .then(({ success }) => {
          if (success) {
            notification.success({
              message: `Applied for ${address}`,
            });

            onSuccess();
          } else {
            notification.error({
              message: `Failed to apply for ${address}`,
            });
          }
        })
        .catch((e: Error) => notification.error({ message: e.message }))
        .finally(() => setModalLoading(false));
    },
    [address, onSuccess, voucherRequest],
  );

  const onCancel = useCallback(
    () => !modalLoading && setModalVisible(false),
    [modalLoading],
  );

  return {
    modalVisible,
    setModalVisible,

    modalLoading,

    onOk,
    onCancel,
  };
};
