interface RequestsItemPaylod {
  name: string;
  total: number;
  rejectedRequestsCount: number;
  successRequestsCount: number;
}

interface ITooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: RequestsItemPaylod;
}

export interface ITooltipProps {
  active?: boolean;
  payload?: ITooltipPayload[];
  label?: string;
}
