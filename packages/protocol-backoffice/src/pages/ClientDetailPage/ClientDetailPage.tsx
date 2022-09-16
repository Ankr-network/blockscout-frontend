import { RightOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import ClientBlockchainActionTable from 'components/ClientBlockchainActionTable/ClientBlockchainActionTable';
import { ClientInfo } from 'components/ClientInfo';
import ClientTransactionTable from 'components/ClientTransactionTable/ClientTransactionTable';
import {
  IManageClientVoucherCreditsFormProps,
  ManageClientVoucherCreditsForm,
} from 'components/ManageClientVoucherCreditsForm';
import { PageHeader } from 'components/PageHeader';
import { observer } from 'mobx-react';
import { ITransactionsEntity, Web3Address } from 'multirpc-sdk';
import { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMultiRpcSdk } from 'stores';
import { LocalGridStore } from 'stores/LocalGridStore';
import { useClientBalance } from 'stores/useClientBalance';
import { useTransactions } from 'stores/useTransactions';
import { useUserBlockchainActions } from 'stores/useUserBlockchainActions';
import { useVoucherModal } from './useManageVoucher';

const { Title, Text } = Typography;

export interface IClientDetailTableProps {
  store: LocalGridStore<ITransactionsEntity>;
}

export const ClientDetailPage = observer(() => {
  const [dayOffset, setDayOffset] = useState(0);

  // TODO: Typed hook # useTypedParams
  const history = useHistory();
  const { address = '' } = useParams<{ address: Web3Address }>();
  const { balance, refetchBalance } = useClientBalance(address);

  const backoffice = useMultiRpcSdk().getBackofficeGateway();

  const transactionStore = useTransactions({
    address,
  });
  const { gridStore: userBlockchainActionsStore, storeLoading } =
    useUserBlockchainActions({
      address,
      day_offset: String(dayOffset),
    });

  const refetchStores = useCallback(() => {
    transactionStore.fetchItems();
    userBlockchainActionsStore.fetchItems();
    refetchBalance();
  }, [refetchBalance, transactionStore, userBlockchainActionsStore]);

  const clientData:
    | IManageClientVoucherCreditsFormProps['clientData']
    | undefined = useMemo(
    () =>
      address && balance
        ? {
            address,
            amountCredit: balance.amount,
            amountUsd: balance.amountUsd,
            amountAnkr: balance.amountAnkr,
            voucherAmount: balance.voucherAmount,
          }
        : undefined,
    [address, balance],
  );

  const {
    modalVisible: addVoucherModalVisible,
    setModalVisible: setAddVoucherModalVisible,
    modalLoading: addVoucherModalLoading,
    onOk: onAddVoucherOk,
    onCancel: onAddVoucherCancel,
  } = useVoucherModal({
    address,
    onSuccess: refetchStores,
    voucherRequest: formData => backoffice.addVoucherCredits(formData),
  });

  const {
    modalVisible: manageVoucherModalVisible,
    setModalVisible: setManageVoucherModalVisible,
    modalLoading: manageVoucherModalLoading,
    onOk: onManageVoucherOk,
    onCancel: onManageVoucherCancel,
  } = useVoucherModal({
    address,
    onSuccess: refetchStores,
    voucherRequest: formData => backoffice.updateVoucherCredits(formData),
  });

  return (
    <>
      <PageHeader
        title={
          <Row gutter={16}>
            <Col>
              Client <RightOutlined style={{ color: '#BBBBBB' }} /> {address}
            </Col>
          </Row>
        }
        onBack={() => history.goBack()}
      />

      <ClientInfo
        address={address}
        amountAnkr={balance?.amountAnkr}
        amountUsd={balance?.amountUsd}
        amountCredits={balance?.amount}
        voucherAmount={balance?.voucherAmount}
      />

      <Divider />

      <Space direction="vertical" style={{ display: 'flex' }} size={40}>
        <div>
          <Title level={2}>Transactions:</Title>
          <ClientTransactionTable store={transactionStore} />
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gridGap: '20px',
            }}
          >
            <Title
              level={2}
              style={{ marginRight: 'auto', alignSelf: 'flex-start' }}
            >
              Actions:
            </Title>

            <Text italic>Display for</Text>
            <InputNumber
              min={0}
              max={6}
              controls
              value={dayOffset}
              onChange={value => setDayOffset(value)}
              disabled={storeLoading}
              style={{ width: 55 }}
            />
            <Text italic>days ago</Text>
          </div>

          <ClientBlockchainActionTable store={userBlockchainActionsStore} />
        </div>

        <Space style={{ marginBottom: 20 }}>
          <Button
            onClick={() => setAddVoucherModalVisible(true)}
            disabled={!balance}
            type="primary"
          >
            Add credits
          </Button>

          <Button
            onClick={() => setManageVoucherModalVisible(true)}
            disabled={!balance}
            type="primary"
          >
            Manage credits
          </Button>
        </Space>
      </Space>

      {clientData && (
        <>
          <Modal
            title="Add Voucher Credits"
            visible={addVoucherModalVisible}
            footer={null}
            onCancel={onAddVoucherCancel}
          >
            <ManageClientVoucherCreditsForm
              isLoading={addVoucherModalLoading}
              clientData={clientData}
              onOk={onAddVoucherOk}
              onCancel={onAddVoucherCancel}
            />
          </Modal>

          <Modal
            title="Manage Voucher Credits"
            visible={manageVoucherModalVisible}
            footer={null}
            onCancel={onManageVoucherCancel}
          >
            <ManageClientVoucherCreditsForm
              isLoading={manageVoucherModalLoading}
              clientData={clientData}
              onOk={onManageVoucherOk}
              onCancel={onManageVoucherCancel}
            />
          </Modal>
        </>
      )}
    </>
  );
});
