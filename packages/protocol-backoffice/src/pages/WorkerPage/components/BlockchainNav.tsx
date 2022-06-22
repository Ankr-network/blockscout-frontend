import { observer } from 'mobx-react';
import { useState, useCallback } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IBlockchainEntity } from 'multirpc-sdk';

import { useMultiRpcSdk } from 'stores';
import CreateBlockchainForm from 'components/CreateBlockchainForm';
import BlockchainTable from 'components/BlockchainTable/BlockchainTable';
import { useBackofficeBlockchains } from 'stores/useBackofficeBlockchains';

export const BlockchainNav = observer(() => {
  const api = useMultiRpcSdk().getWorkerBackofficeGateway();

  const gridStore = useBackofficeBlockchains();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({} as IBlockchainEntity);

  const onSubmit = useCallback(
    (values: IBlockchainEntity) => {
      // eslint-disable-next-line no-console
      console.log(
        `Creating/updating blockchain: ${JSON.stringify(values, null, 2)}`,
      );

      api
        .createOrUpdateBlockchain(values)
        .then(() => {
          setIsLoading(false);
          setDrawerVisible(false);
          // noinspection JSIgnoredPromiseFromCall
          gridStore.fetchItems();
        })
        .catch(() => {
          setIsLoading(false);
        });
      setIsLoading(true);
    },
    [api, gridStore],
  );

  const onDelete = useCallback(
    (blockchain: IBlockchainEntity) => {
      api
        .deleteBlockchain(blockchain)
        .then(() => {
          setIsLoading(false);
          // noinspection JSIgnoredPromiseFromCall
          gridStore.fetchItems();
        })
        .catch(() => {
          setIsLoading(false);
        });
      setIsLoading(true);
    },
    [api, gridStore],
  );

  const onUpdate = useCallback((blockchain: IBlockchainEntity) => {
    setInitialValues(blockchain);
    setDrawerVisible(true);
  }, []);

  return (
    <div>
      <Drawer
        title="Create or update Blockchain"
        width={500}
        bodyStyle={{ paddingBottom: 80 }}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <CreateBlockchainForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Drawer>
      <BlockchainTable
        onDelete={onDelete}
        onUpdate={onUpdate}
        store={gridStore}
      />
      <Divider />
      <Button
        size="large"
        type="primary"
        onClick={() => setDrawerVisible(true)}
        icon={<PlusOutlined />}
      >
        Create Blockchain
      </Button>
    </div>
  );
});
