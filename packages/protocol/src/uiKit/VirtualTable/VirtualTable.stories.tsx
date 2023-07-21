// import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { useEffect, useState } from 'react';

import { VirtualTableColumn, VirtualTable } from '.';
// eslint-disable-next-line import/no-extraneous-dependencies

const createRow = (_: any, index: number) => ({
  number: index,
  method: 'eth_GetBlockByNum, Batch (3)',
  errorCode: 404,
  httpCode: 500,
  responseTime: 1000,
  dateTime: '1111111',
  costUsd: '2',
  rawParams: '["11573830", "true"]',
  rawResult: 'true',
});

const createArray = <T extends Record<string, any>>(
  count: number,
  createItem: (...args: any) => T,
) => {
  return Array(count).fill(undefined).map(createItem);
};

const defaultRows = createArray(10, createRow);

type Item = {
  number: number;
  method: string;
  errorCode: number;
  httpCode: number;
  responseTime: number;
  dateTime: string;
  costUsd: string;
};

const columns: VirtualTableColumn<Item>[] = [
  {
    field: 'number',
    headerName: '#',
    render: 'number',
    align: 'left',
    width: 50,
  },
  {
    field: 'method',
    headerName: 'Method',
    render: 'method',
    sortable: true,
    align: 'left',
    width: 250,
  },
  {
    field: 'errorCode',
    headerName: 'Error Code',
    render: 'errorCode',
    align: 'center',
  },
  {
    field: 'httpCode',
    headerName: 'HTTP',
    render: 'httpCode',
    align: 'center',
  },
  {
    field: 'responseTime',
    headerName: 'Response Time',
    render: 'responseTime',
    align: 'center',
  },
  {
    field: 'dateTime',
    headerName: 'Date & Time',
    render: 'dateTime',
    align: 'right',
  },
  {
    field: 'costUsd',
    headerName: 'Cost USD',
    render: 'costUsd',
    align: 'right',
  },
];

storiesOf('ui/Table', module).add('Virtualized', () => {
  const [rows, setRows] = useState<Item[]>([]);

  useEffect(() => {
    const f = async () => {
      await new Promise(r => setTimeout(r, 300));
      setRows(defaultRows);
    };

    f();
  }, []);

  const handleChangePage = async () => {
    await new Promise(r => setTimeout(r, 900));

    setRows([...rows, ...createArray(100000, createRow)]);
  };

  return (
    <div style={{ height: '100%' }}>
      <VirtualTable
        isMoreRowsAvailable
        onChangePage={handleChangePage}
        pagination="more"
        minWidth={900}
        cols={columns}
        rows={rows}
      />
    </div>
  );
});
