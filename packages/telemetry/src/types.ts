export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}

export type RPCRequestName = string;
export interface PrivateStatTopRequests {
  method: RPCRequestName;
  count: number;
  total_cost: number;
  totalCost?: string; // used in backoffice stats response
}

export interface ChainCalls {
  calls: number;
  name: string;
}

export interface BaseTableDataProps {
  label: string;
  value: string;
}

export interface BaseTableDataPropsJSX {
  label: JSX.Element;
  value: JSX.Element;
}

export type BaseTableData = BaseTableDataProps | BaseTableDataPropsJSX;

export interface UsageHistoryDataType {
  calls: number | string;
  month: string;
}
