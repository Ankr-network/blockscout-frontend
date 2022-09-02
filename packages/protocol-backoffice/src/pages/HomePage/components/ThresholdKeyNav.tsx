import { observer } from 'mobx-react';
import { useState, useCallback } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IPlayer } from 'multirpc-sdk';

import { useMultiRpcSdk } from 'stores';
import { GenerateThresholdKeyForm } from 'components/GenerateThresholdKeyForm';
import { ThresholdKeyTable } from 'components/ThresholdKeyTable';
import { useLocalGridStore } from 'stores/LocalGridStore';

export const ThresholdKeyNav = observer(() => {
  const api = useMultiRpcSdk().getConsensusGateway();

  const formStore = useLocalGridStore(async () => {
    const [players] = await api.getPlayers(0, 1000);
    const activePlayers = players.filter(
      (player: IPlayer) => player.status === 'PLAYER_STATUS_ACTIVE',
    );

    return [activePlayers, false];
  });

  const gridStore = useLocalGridStore((offset, limit) =>
    api.getThresholdKeys(offset, limit),
  );

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    values => {
      // eslint-disable-next-line no-console
      console.log(
        `Generating threshold key: ${JSON.stringify(values, null, 2)}`,
      );
      api
        .generateThresholdKey(values)
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
        title="Generate new threshold key"
        width={500}
        onClose={() => setDrawerVisible(false)}
        bodyStyle={{ paddingBottom: 80 }}
        visible={drawerVisible}
      >
        <GenerateThresholdKeyForm
          players={formStore.items}
          isFetching={formStore.isLoading}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Drawer>
      <ThresholdKeyTable store={gridStore} />
      <Divider />
      <Button
        size="large"
        type="primary"
        onClick={() => setDrawerVisible(true)}
        icon={<PlusOutlined />}
      >
        Generate New Threshold Key
      </Button>
    </div>
  );
});
