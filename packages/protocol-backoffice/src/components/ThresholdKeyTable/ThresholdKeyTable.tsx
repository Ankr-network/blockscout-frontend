import React from 'react';
import { Alert, Spin, Table } from 'antd';
import { observer, Observer } from 'mobx-react';
import { IThresholdKey, PrefixedHex } from 'multirpc-sdk';

import { LocalGridStore } from 'stores/LocalGridStore';
import { useLocalFetchDataStore } from 'stores/FetchDataStore';
import { useMultiRpcSdk } from 'stores';
import { tableThresholdKeyColumns } from './ThresholdKeyTableUtils';
import { ThresholdKeyExpander } from './ThresholdKeyExpander';

export interface IThresholdKeyTableProps {
  store: LocalGridStore<IThresholdKey>;
}

export const ThresholdKeyTable = observer((props: IThresholdKeyTableProps) => {
  const api = useMultiRpcSdk().getConsensusGateway();
  const store = useLocalFetchDataStore<{
    threshold_key: IThresholdKey;
    deposit_addresses?: Record<PrefixedHex, PrefixedHex>;
  }>();
  return (
    <Table
      loading={props.store.isLoading}
      pagination={props.store.paginationConfig}
      expandable={{
        expandedRowRender: () => {
          return (
            <Observer>
              {() => {
                if (store.isLoading) {
                  return (
                    <Spin tip="Loading...">
                      <Alert
                        message=""
                        description="Fetching information about threshold key."
                        type="info"
                      />
                    </Spin>
                  );
                }

                if (!store.item) {
                  return <span>No Data</span>;
                }

                return (
                  <ThresholdKeyExpander
                    thresholdKey={store.item?.threshold_key}
                    depositAddresses={store.item?.deposit_addresses || {}}
                  />
                );
              }}
            </Observer>
          );
        },
        onExpand(expanded: boolean, record: IThresholdKey) {
          if (!expanded) return;
          // noinspection JSIgnoredPromiseFromCall
          store.refreshItem(api.getThresholdKeyById(record.id));
        },
        expandRowByClick: true,
      }}
      dataSource={props.store.items}
      rowKey="id"
      columns={tableThresholdKeyColumns}
    />
  );
});
