export interface INotificationsSettings {
  deposit?: boolean;
  withdraw?: boolean;
  voucher?: boolean;
  low_balance?: boolean;
  marketing?: boolean;
  credit_info?: boolean;
  credit_warn?: boolean;
  credit_alarm?: boolean;
  credit_info_threshold?: ICreditThreshold;
  credit_warn_threshold?: ICreditThreshold;
  credit_alarm_threshold?: ICreditThreshold;
}

interface ICreditThreshold {
  value: number;
}
