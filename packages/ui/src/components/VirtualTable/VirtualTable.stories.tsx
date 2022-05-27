// import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { VirtualTableColumn, VirtualTable } from '.';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

const createRow = (_: any, index: number) => ({
  number: index,
  method: faker.random.arrayElement(['eth_GetBlockByNum', 'Batch (3)']),
  errorCode: faker.random.arrayElement([200, 404, 500]),
  httpCode: faker.random.arrayElement([200, 404, 500]),
  responseTime: faker.datatype.number({ max: 1000 }),
  dateTime: faker.datatype.datetime().toISOString(),
  costUsd: faker.finance.amount(),
  rawParams: '["11573830", "true"]',
  rawResult: faker.datatype.json(),
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

storiesOf('uiKit/Table', module).add('Virtualized', () => {
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

  // const handleSort = async () => {
  //   await new Promise(r => setTimeout(r, 900));

  //   setRows([...rows].reverse());
  // };

  // const renderExpand = () => {
  //   return <div>test collapse</div>;
  // };

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
