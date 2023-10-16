export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}

export type RPCRequestName = string;
export interface MethodCallsRequests {
  method: RPCRequestName;
  count: number;
}

export interface ChainCalls {
  calls: number;
  name: string;
}

export interface BaseTableDataProps {
  label: string | JSX.Element;
  value: string | JSX.Element;
}

export type BaseTableData = BaseTableDataProps;

export interface UsageHistoryData {
  calls: number;
  month: string;
}

export interface UsageHistoryDataMapped extends UsageHistoryData {
  formattedCallsValue: string;
}

export type TranslationNumberFn = (value: number) => string;
export type TranslationDateFn = (value: Date) => string;

export interface TranslationRequestWidget {
  date: TranslationDateFn;
  time: TranslationDateFn;
  callsCount: TranslationNumberFn;
  title: string;
  placeholderTitle: string;
  placeholderSubtitle: string;
  requestsTitle: string;
  allRequestsTitle: string;
}

export interface TranslationMethodCallsWidget {
  downloadButton: string;
  blockHeight: string;
  requests: string;
  average: string;
  noData: string;
  method: string;
  title: string;
  usage: string;
  total: TranslationNumberFn;
}
