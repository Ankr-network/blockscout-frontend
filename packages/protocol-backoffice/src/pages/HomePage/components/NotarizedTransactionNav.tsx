import { observer } from 'mobx-react';
import { useState, useCallback } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { prefixedHexToBase64 } from 'multirpc-sdk';

import { useMultiRpcSdk } from 'stores';
import NotarizeTransactionForm from 'components/NotarizeTransactionForm';
import NotarizedTransactionTable from 'components/NotarizedTransactionTable/NotarizedTransactionTable';
import { useLocalGridStore } from 'stores/LocalGridStore';

export const NotarizedTransactionNav = observer(() => {
  const api = useMultiRpcSdk().getApiGateway();
  const formStore = useLocalGridStore(() => api.getThresholdKeys(0, 100));

  const gridStore = useLocalGridStore((offset, limit) => {
    return api.getNotarizedTransactions(offset, limit);
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    values => {
      // eslint-disable-next-line no-console
      console.log(`Notarizing transaction: ${JSON.stringify(values, null, 2)}`);

      const request = {
        threshold_key: values.threshold_key,
        chain_id: prefixedHexToBase64(values.chain_id),
        transaction_hash: prefixedHexToBase64(values.transaction_hash),
        block_number: values.block_number,
        transaction_index: values.transaction_index,
      };

      api
        .notarizeTransaction(request)
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

  return (
    <div>
      <Drawer
        title="Notarize Transaction"
        width={500}
        onClose={() => {
          setDrawerVisible(false);
        }}
        bodyStyle={{ paddingBottom: 80 }}
        visible={drawerVisible}
      >
        <NotarizeTransactionForm
          thresholdKeys={formStore.items}
          isFetching={formStore.isLoading}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Drawer>
      <NotarizedTransactionTable store={gridStore} />
      <Divider />
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setDrawerVisible(true);
        }}
        icon={<PlusOutlined />}
      >
        Notarize Transaction
      </Button>
    </div>
  );
});
