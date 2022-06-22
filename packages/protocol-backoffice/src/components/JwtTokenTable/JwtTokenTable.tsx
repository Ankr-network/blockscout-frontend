import React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { IJwtToken } from 'multirpc-sdk';

import { LocalGridStore } from 'stores/LocalGridStore';
import { useLocalFetchDataStore } from 'stores/FetchDataStore';
import { useMultiRpcSdk } from 'stores';
import { tableColumns } from './JwtTokenTableUtils';
import { JwtTokenExpander } from './JwtTokenExpander';

export interface IJwtTokenTableProps {
  store: LocalGridStore<IJwtToken>;
}

const JwtTokenTable = observer((props: IJwtTokenTableProps) => {
  const api = useMultiRpcSdk().getApiGateway();
  const store = useLocalFetchDataStore<IJwtToken>();

  return (
    <Table
      loading={props.store.isLoading}
      pagination={props.store.paginationConfig}
      expandable={{
        expandedRowRender: (jwtToken: IJwtToken) => (
          <JwtTokenExpander jwtToken={jwtToken} />
        ),
        onExpand(expanded: boolean, record: IJwtToken) {
          if (!expanded) return;
          // noinspection JSIgnoredPromiseFromCall
          store.refreshItem(api.getJwtTokenById(record.id));
        },
        expandRowByClick: true,
      }}
      dataSource={props.store.items}
      rowKey="id"
      columns={tableColumns}
    />
  );
});

export default JwtTokenTable;
