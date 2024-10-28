import { Milliseconds } from "@ankr.com/utils";

import { Web3Address } from "../../common";

export enum EGlobalNotificationType {
  BALANCE_ALARM = 'BALANCE_ALARM',
  SUPER_RED_ALERT = 'SUPER_RED_ALERT',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  PROMO_BUNDLE_EXPIRED = 'PROMO_BUNDLE_EXPIRED',
}

export enum EFinanceNotificationType {
  DEPOSIT = 'DEPOSIT',
  VOUCHER = 'VOUCHER',
  USAGE_1D = 'USAGE_1D',
  USAGE_1W = 'USAGE_1W',
  WITHDRAW = 'WITHDRAW',
  LOW_BALANCE = 'LOW_BALANCE',
  BALANCE_WARN = 'BALANCE_WARN',
  BALANCE_INFO = 'BALANCE_INFO',
  BUNDLE_USAGE = 'BUNDLE_USAGE',
  BALANCE_3DAYS = 'BALANCE_3DAYS',
  BALANCE_7DAYS = 'BALANCE_7DAYS',
  NEGATIVE_BALANCE = 'NEGATIVE_BALANCE',
  MONTHLY_CREDIT_DEPLETED = 'MONTHLY_CREDIT_DEPLETED',
}

export enum ETechnicalNotificationType {
  ACCOUNT_OFF_LOADED = 'ACCOUNT_OFF_LOADED',
}

export enum EMarketingNotificationType {
  MARKETING = 'MARKETING',
}

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESortBy {
  TIMESTAMP = 'TIMESTAMP',
}

export enum ENotificationCategory {
  BILLING = 'BILLING',
  SYSTEM = 'SYSTEM',
  NEWS = 'NEWS',
  UNKNOWN = 'UNKNOWN',
}

export interface IGetNotificationsParams {
  only_unseen?: boolean; // false by default
  sort_by?: ESortBy; // TIMESTAMP by default
  sort_direction?: ESortDirection; // DESC by default
  category?: ENotificationCategory;
  older_than?: Milliseconds;
  cursor?: number;
  limit?: number;
}

export interface IDeliveryItem {
  channel: string;
  sent: boolean;
}

export interface ICommonNotification {
  id: string;
  address: string;
  title: string;
  category: ENotificationCategory;
  message: string;
  seen: boolean;
  deliveries: IDeliveryItem[];
  createdAt: number;
  updatedAt: number
}

export interface IGlobalNotification extends ICommonNotification {
  type: EGlobalNotificationType;
}

export interface IFinanceNotification extends ICommonNotification {
  type: EFinanceNotificationType;
}

export interface ITechnicalNotification extends ICommonNotification {
  type: ETechnicalNotificationType;
}

export interface IMarketingNotification extends ICommonNotification {
  type: EMarketingNotificationType;
}

export type INotificationItem =
  IGlobalNotification
  | IFinanceNotification
  | ITechnicalNotification
  | IMarketingNotification;

export interface IGetNotificationsResponse {
  cursor: number;
  notifications: INotificationItem[];
}

export interface IMarkNotificationsAsReadParams {
  seen: boolean;
  ids?: string[];
}

export interface IMarkNotificationsAsReadResponse {
  result: string;
}

export interface IGetNotificationsChannelsParams {
  active_only: boolean;
}

interface ICreditThreshold {
  value: number;
}

export interface INotificationsChannelConfig {
  deposit?: boolean;
  withdraw?: boolean;
  voucher?: boolean;
  usage_1d?: boolean;
  usage_1w?: boolean;
  marketing?: boolean;
  low_balance?: boolean;
  balance_3days?: boolean;
  balance_7days?: boolean;
  credit_alarm?: boolean;
  credit_alarm_threshold?: ICreditThreshold;
  credit_info?: boolean;
  credit_info_threshold?: ICreditThreshold;
  credit_warn?: boolean;
  credit_warn_threshold?: ICreditThreshold;
  account_suspended?: boolean;
  negative_balance?: boolean;
  account_off_loaded?: boolean;
  monthly_credit_depleted?: boolean;
  bundle_usage?: boolean;
  promo_bundle_expired?: boolean;
  super_red_alert?: boolean;
}

export enum ENotificationChannel {
  TELEGRAM = 'TELEGRAM',
  EMAIL = 'EMAIL',
  SLACK = 'SLACK',
}

export interface IGetNotificationsChannelsResponse {
  address: Web3Address;
  channel: ENotificationChannel;
  handle: string;
  username: string;
  is_active: boolean;
  is_group: boolean;
  configs: INotificationsChannelConfig;
}

export interface IUpdateNotificationsChannelParams {
  channel: ENotificationChannel;
  config: INotificationsChannelConfig;
}

export interface IGetTelegramNotificationsBotDataResponse {
  name: string;
  url: string;
}

export interface IEnableTelegramIntegrationParams {
  confirmation_data: string;
}

export interface IEnableTelegramIntegrationResponse {
  result: string;
}

export interface IDeleteNotificationsChannelParams {
  channel: ENotificationChannel;
}

export interface IDeleteNotificationsChannelResponse {
  result: string;
}
