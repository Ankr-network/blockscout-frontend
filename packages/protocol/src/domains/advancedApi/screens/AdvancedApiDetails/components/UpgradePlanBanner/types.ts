import { ReactNode } from 'react';

export interface BannerContent {
  image: string;
  planTitle: string;
  planDescription: string;
  proposalTitle: string;
  proposalDescription: string;
  renderButton: (params: ButtonRendererParams) => ReactNode;
}

export interface ButtonRendererParams {
  className?: string;
  onClick?: () => void;
}
