export const tableColumns: any[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'URL',
    dataIndex: 'requestUrl',
    key: 'requestUrl',
  },
  {
    title: 'Continent',
    dataIndex: 'continent',
    key: 'continent',
  },
  {
    title: 'Latency',
    dataIndex: 'latency',
    key: 'latency',
    render: (value?: number) => {
      if (!value) return `N/A`;
      return <span>{value}&nbsp;ms</span>;
    },
  },
];
