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

export interface Item {
  hasIntro: boolean;
  itemCount: number;
  renderButton: ButtonRenderer;
  title: Title;
  isHighlighted: boolean;
}

export interface PremiumChainDialogProps {
  onClose: () => void;
  onUpgrade?: () => void;
  open: boolean;
  defaultState?: ContentType;
}

export enum Title {
  enterprise = 'enterprise',
  free = 'free',
  premium = 'premium',
}
