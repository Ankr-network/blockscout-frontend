import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { useMultiRpcSdk } from 'stores';
import { useCreateClientModal } from './useCreateClientModal';
import { CreateClientForm } from './СreateClientForm';

export const CreateClientButton = observer(() => {
  const backoffice = useMultiRpcSdk().getBackofficeGateway();

  const {
    createClientModalVisible,
    setCreateClientModalVisible,
    createClientModalLoading,
    onOk,
    onCancel,
  } = useCreateClientModal({
    createTestClientRequest: formData =>
      backoffice.createTestPremiumUser(formData),
  });

  return (
    <>
      <Button
        type="primary"
        style={{
          position: 'absolute',
          top: '20px',
          right: '150px',
        }}
        onClick={() => setCreateClientModalVisible(true)}
      >
        Add Client
      </Button>

      <Modal
        title="Add Client"
        visible={createClientModalVisible}
        onCancel={onCancel}
        footer={null}
      >
        <CreateClientForm
          isLoading={createClientModalLoading}
          onOk={onOk}
          onCancel={onCancel}
        />
      </Modal>
    </>
  );
});
