import { Breadcrumbs as BreadcrumbsBase } from 'uiKit/Breadcrumbs';

import { useBreadcrumbs } from '../BreadcrumbsProvider';

export interface BreadcrumbsProps {
  isChainItemPage?: boolean;
}

const CHAIN_PAGE_CUSTOM_BREAKPOINT = 1050;

export const Breadcrumbs = ({ isChainItemPage }: BreadcrumbsProps) => {
  const { breadcrumbs } = useBreadcrumbs();

  const breakpoint = isChainItemPage ? CHAIN_PAGE_CUSTOM_BREAKPOINT : undefined;

  return <BreadcrumbsBase customBreakpoint={breakpoint} items={breadcrumbs} />;
};
