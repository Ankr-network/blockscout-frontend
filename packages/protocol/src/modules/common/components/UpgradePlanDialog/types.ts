import { ReactNode } from 'react';

export type ButtonRenderer = (params: ButtonRendererParams) => ReactNode;

export enum ContentType {
  DEFAULT,
  SIGN_UP,
  TOP_UP,
  CONTACT_SALES_FORM,
  CONTACT_SALES_SUCCESS,
}

export interface ButtonRendererParams {
  className: string;
  onClick?: () => void;
  variant: 'outlined' | 'contained';
  color: 'primary' | 'secondary';
}

export interface Plan {
  hasIntro: boolean;
  id: PlanID;
  isHighlighted: boolean;
  prosCount: number;
  renderButton: ButtonRenderer;
}

export enum PlanID {
  Enterprise = 'enterprise',
  Free = 'free',
  Premium = 'premium',
}

export interface TypeCheckingParams {
  hasPremium?: boolean;
  isEnterpriseClient?: boolean;
  hasUserGroupDialog?: boolean;
  isGroupSelected?: boolean;
  isLoggedIn?: boolean;
  loading?: boolean;
  type?: UpgradePlanDialogType;
}

export enum UpgradePlanDialogType {
  Default = 'default',
  Register = 'register',
  Premium = 'premium',
  Enterprise = 'enterprise',
}

export type UpgradeHandler = (plan: PlanID) => void;
