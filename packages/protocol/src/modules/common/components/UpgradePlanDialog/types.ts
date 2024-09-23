import { ReactNode } from 'react';

export type ButtonRenderer = (params: ButtonRendererParams) => ReactNode;

export enum ContentType {
  SIGN_UP,
  TOP_UP,
}

export interface ButtonRendererParams {
  className: string;
  onClick?: () => void;
  variant: 'outlined' | 'contained';
  color: 'primary' | 'secondary';
}

export interface TypeCheckingParams {
  hasPremium?: boolean;
  isEnterpriseClient?: boolean;
  hasUserGroupDialog?: boolean;
  isGroupSelected?: boolean;
  isLoggedIn?: boolean;
  loading?: boolean;
}
