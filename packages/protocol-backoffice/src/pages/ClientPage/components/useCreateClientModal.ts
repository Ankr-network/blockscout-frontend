import { useCallback, useState } from 'react';
import { notification } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { ClientType } from 'types';
import { useMultiRpcSdk } from 'stores';

export const useCreateClientModal = () => {
  const backoffice = useMultiRpcSdk().getBackofficeGateway();
  const history = useHistory();
  const { pathname } = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const onOk = useCallback(
    formData => {
      setModalLoading(true);

      backoffice
        .createTestPremiumUser(formData)
        .then(data => {
          if (data.token) {
            notification.success({
              message: `Created test user for ${formData.address}`,
            });
          } else {
            notification.error({
              message: `Failed to create user for ${formData.address}`,
            });
          }
        })
        .catch((e: Error) => notification.error({ message: e.message }))
        .finally(() => {
          setModalLoading(false);
          if (formData.address) {
            history.push({
              pathname: `${pathname}/${formData.address}`,
              state: {
                clientType: ClientType.TestDrivePremium,
                token: formData.token,
              },
            });
          }
        });
    },
    [history, pathname, backoffice],
  );

  const onCancel = useCallback(
    () => !modalLoading && setModalVisible(false),
    [modalLoading],
  );

  return {
    createClientModalVisible: modalVisible,
    setCreateClientModalVisible: setModalVisible,

    createClientModalLoading: modalLoading,

    onOk,
    onCancel,
  };
};
