import { RoutesConfig } from 'modules/stake-mgno/Routes';

interface ITableRow {
  provider: string;
  nodeKeys: number;
  slashingProtection: string;
  insurancePool: string;
  staked: string;
  available: string;
  apr: string;
  stakeLink?: string;
  detailsLink?: string;
}

interface ITableData {
  isLoading: boolean;
  data: ITableRow[];
}

export const useTableData = (): ITableData => {
  const data: ITableRow[] = [
    {
      provider: 'test provider 1',
      nodeKeys: 1,
      slashingProtection: '98',
      insurancePool: '10',
      apr: '0.2',
      staked: '100',
      available: '233',
      stakeLink: RoutesConfig.stake.generatePath(),
      detailsLink: '',
    },
    {
      provider: 'test provider 2',
      nodeKeys: 1,
      slashingProtection: '98',
      insurancePool: '10',
      apr: '0.2',
      staked: '100',
      available: '233',
    },
  ];

  return {
    isLoading: false,
    data,
  };
};
