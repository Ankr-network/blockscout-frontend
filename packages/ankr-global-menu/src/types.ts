import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

export type IGlobalMenuProject =
  | 'rpc'
  | 'landing'
  | 'staking'
  | 'docs'
  | 'stakefi'
  | 'ankrscan';

export interface IGlobalMenuItem {
  id: string;
  project?: IGlobalMenuProject;
  title: string;
  items: {
    label: string;
    link: string;
    isExternal?: boolean;
    project?: IGlobalMenuProject;
  }[];
}

export interface IGlobalMenuLinkProps {
  className?: string;
  to: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  children: ReactNode;
}
