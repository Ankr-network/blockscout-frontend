import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer } from 'antd';
import { observer } from 'mobx-react';
import { INodeEntity } from 'multirpc-sdk';
import { useCallback, useState } from 'react';

import CreateNodeForm from 'components/CreateNodeForm/CreateNodeForm';
import NodeTable from 'components/NodeTable/NodeTable';
import { useMultiRpcSdk } from 'stores';
import { useBackofficeNodes } from 'stores/useBackofficeNodes';

export const NodeNav = observer(({ blockchain }: { blockchain?: string }) => {
  const api = useMultiRpcSdk().getWorkerBackofficeGateway();
  const gridStore = useBackofficeNodes(blockchain);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({} as INodeEntity);

  const onSubmit = useCallback(
    (values: INodeEntity) => {
      // eslint-disable-next-line no-console
      console.log(`Creating/updating node: ${JSON.stringify(values, null, 2)}`);

      api
        .createOrUpdateNode(values as any)
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
    (node: INodeEntity) => {
      // noinspection JSIgnoredPromiseFromCall
      api
        .deleteNode(node)
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

  const onUpdate = useCallback((node: INodeEntity) => {
    setInitialValues(node);
    setDrawerVisible(true);
  }, []);

  const onCreateNode = useCallback(() => {
    setInitialValues({} as INodeEntity);
    setDrawerVisible(true);
  }, []);

  return (
    <div>
      <Drawer
        title="Create or update node"
        width={500}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <CreateNodeForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Drawer>
      <NodeTable onDelete={onDelete} onUpdate={onUpdate} store={gridStore} />
      <Divider />
      <Button
        size="large"
        type="primary"
        onClick={onCreateNode}
        icon={<PlusOutlined />}
      >
        Create Node
      </Button>
    </div>
  );
});
