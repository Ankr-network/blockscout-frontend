import {
  BranchesOutlined,
  ClearOutlined,
  KeyOutlined,
  LockOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';

import { PageHeader } from 'components/PageHeader';
import { DebugConsole } from './components/DebugConsole/DebugConsole';
import { JwtTokenNav } from './components/JwtTokenNav';
import { NotarizedTransactionNav } from './components/NotarizedTransactionNav';
import { ProposalNav } from './components/ProposalNav';
import { ThresholdKeyNav } from './components/ThresholdKeyNav';

enum Tab {
  ThresholdKey = 'threshold_key',
  NotarizedTransaction = 'notarized_transaction',
  JwtToken = 'jwt_token',
  Proposal = 'proposal',
  Console = 'debug_console',
}

export const HomePage = observer(() => {
  const [currentTab, setCurrentTab] = useState(Tab.ThresholdKey);

  return (
    <>
      <PageHeader title="Home Page" />

      <div>
        <Menu
          selectedKeys={[currentTab]}
          onSelect={({ selectedKeys }) => {
            setCurrentTab(selectedKeys[0] as Tab);
          }}
          mode="horizontal"
        >
          <Menu.Item key={Tab.ThresholdKey} icon={<LockOutlined />}>
            Threshold Keys
          </Menu.Item>
          <Menu.Item
            key={Tab.NotarizedTransaction}
            icon={<TranslationOutlined />}
          >
            Notarized Transactions
          </Menu.Item>
          <Menu.Item key={Tab.JwtToken} icon={<KeyOutlined />}>
            Jwt Tokens
          </Menu.Item>
          <Menu.Item key={Tab.Proposal} icon={<ClearOutlined />}>
            Proposal
          </Menu.Item>
          <Menu.Item key={Tab.Console} icon={<BranchesOutlined />}>
            Debug Console
          </Menu.Item>
        </Menu>
        <br />
        {currentTab === Tab.ThresholdKey && <ThresholdKeyNav />}
        {currentTab === Tab.NotarizedTransaction && <NotarizedTransactionNav />}
        {currentTab === Tab.JwtToken && <JwtTokenNav />}
        {currentTab === Tab.Proposal && <ProposalNav />}
        {currentTab === Tab.Console && <DebugConsole />}
      </div>
    </>
  );
});
