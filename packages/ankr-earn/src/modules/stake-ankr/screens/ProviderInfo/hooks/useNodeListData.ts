import BigNumber from 'bignumber.js';

interface INodeListData {
  nodeName: string;
  nodeDescription: string;
  countryCode: string;
  location: string;
  blockHeight: BigNumber;
  totalRequests: BigNumber;
  totalPaid: BigNumber;
  uptime: BigNumber;
  minUptime: BigNumber;
  latency: BigNumber;
  maxLatency: BigNumber;
}

const DEMO_DATA = [
  {
    nodeName: 'Node 1',
    nodeDescription: 'archive data',
    countryCode: 'DE',
    location: 'Germany',
    blockHeight: new BigNumber(21_234_567),
    totalRequests: new BigNumber(8_214_567),
    totalPaid: new BigNumber(7_634_567),
    uptime: new BigNumber(99.1),
    minUptime: new BigNumber(95),
    latency: new BigNumber(20),
    maxLatency: new BigNumber(30),
  },
  {
    nodeName: 'Node 2',
    nodeDescription: 'archive data',
    countryCode: 'RU',
    location: 'Russia',
    blockHeight: new BigNumber(21_234_567),
    totalRequests: new BigNumber(8_214_567),
    totalPaid: new BigNumber(7_634_567),
    uptime: new BigNumber(78.1),
    minUptime: new BigNumber(95),
    latency: new BigNumber(49),
    maxLatency: new BigNumber(30),
  },
];

export const useNodeListData = (): {
  isLoading: boolean;
  data: INodeListData[];
} => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
