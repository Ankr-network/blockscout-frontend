import { ReactNode } from 'react';

export type ButtonRenderer = (params: ButtonRendererParams) => ReactNode;

export enum ContentType {
  DEFAULT,
  SIGN_UP,
  TOP_UP,
}

export interface ButtonRendererParams {
  className: string;
  onClick?: () => void;
}

export interface Item {
  hasIntro: boolean;
  itemCount: number;
  renderButton: ButtonRenderer;
  title: Title;
}

export interface PremiumChainDialogProps {
  onClose: () => void;
  onTrack?: () => void;
  open: boolean;
}

export enum Title {
  enterprise = 'enterprise',
  free = 'free',
  premium = 'premium',
}
