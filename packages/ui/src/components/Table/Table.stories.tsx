import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { Table, TableColumn } from '.';
import { TableExpander } from './components/TableExpander';

type Item = {
  number: string;
  method: string;
  errorCode: string;
  httpCode: string;
  responseTime: string;
  dateTime: string;
  costUsd: string;
};

const columns: TableColumn<Item>[] = [
  {
    field: 'number',
    headerName: '#',
    render: 'number',
    width: 50,
    align: 'left',
  },
  {
    field: 'method',
    headerName: 'Method',
    render: 'method',
    width: 300,
    sortable: true,
    align: 'left',
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
  {
    field: 'expand',
    headerName: '',
    render: (_row, index) => <TableExpander index={index} />,
    width: 30,
    align: 'right',
  },
];

const defaultRows = [
  {
    number: '1',
    method: 'eth_GetBlockByNumber',
    errorCode: '1',
    httpCode: '200',
    responseTime: '60ms',
    dateTime: 'Mar 31, 2022 13:32',
    costUsd: '−18.24',
  },
  {
    number: '2',
    method: 'eth_GetBlockByNumber',
    errorCode: '1',
    httpCode: '200',
    responseTime: '60ms',
    dateTime: 'Mar 31, 2022 13:32',
    costUsd: '−18.24',
  },
];

storiesOf('uiKit/Table', module).add('Default', () => {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);
      setRows(defaultRows);
    };

    f();
  }, []);

  const handleChangePage = async () => {
    await new Promise(r => setTimeout(r, 900));

    setRows([...rows, ...defaultRows]);
  };

  const handleSort = async () => {
    await new Promise(r => setTimeout(r, 900));

    setRows([...rows].reverse());
  };

  const renderExpand = () => {
    return <div>test collapse</div>;
  };

  return (
    <Table
      isLoading={loading}
      isMoreRowsAvailable
      onChangePage={handleChangePage}
      pagination="more"
      renderExpand={renderExpand}
      onSort={handleSort}
      minWidth={900}
      rows={rows}
      cols={columns}
    />
  );
});
