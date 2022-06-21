import { TranslationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { PageHeader } from 'components/PageHeader';
import { observer } from 'mobx-react';
import { IBlockchainEntity } from 'multirpc-sdk';
import { useState } from 'react';

import { useBackofficeBlockchains } from 'stores/useBackofficeBlockchains';
import { BlockchainNav } from './components/BlockchainNav';
import { NodeNav } from './components/NodeNav';

enum Tab {
  Node = 'node',
  Blockchain = 'blockchain',
}

export const WorkerPage = observer(() => {
  const gridStore = useBackofficeBlockchains();

  const [currentTab, setCurrentTab] = useState(Tab.Node);
  const [tabName, blockchain, blockchainName] = currentTab.split(':');

  return (
    <>
      <PageHeader title="Worker Page" />

      <div>
        <Menu
          selectedKeys={[currentTab]}
          onSelect={({ selectedKeys }) => {
            setCurrentTab(selectedKeys[0] as Tab);
          }}
          mode="horizontal"
        >
          <Menu.SubMenu
            key="node"
            title={blockchainName ? `Node (${blockchainName})` : `Node`}
            icon={<TranslationOutlined />}
          >
            <Menu.Item key={Tab.Node}>All</Menu.Item>
            {gridStore.items.map((data: IBlockchainEntity) => (
              <Menu.Item key={`node:${data.id}:${data.name}`}>
                {data.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.Item key={Tab.Blockchain} icon={<TranslationOutlined />}>
            Blockchain
          </Menu.Item>
        </Menu>
        <br />
        {tabName === Tab.Node && <NodeNav blockchain={blockchain} />}
        {tabName === Tab.Blockchain && <BlockchainNav />}
      </div>
    </>
  );
});
