import { Breadcrumbs as BreadcrumbsBase } from 'uiKit/Breadcrumbs';
import { useIsMDDown } from 'uiKit/Theme/useTheme';
import { AccountStatus } from 'modules/common/components/AccountStatus/AccountStatus';

import { useBreadcrumbs } from '../BreadcrumbsProvider';
import { useBreadcrumbsStyles } from './useBreadcrumbsStyles';

export interface BreadcrumbsProps {
  isChainItemPage?: boolean;
  isChainsPublicPage?: boolean;
}

const CHAIN_PAGE_CUSTOM_BREAKPOINT = 1050;

export const Breadcrumbs = ({
  isChainItemPage,
  isChainsPublicPage,
}: BreadcrumbsProps) => {
  const { classes } = useBreadcrumbsStyles();

  const { breadcrumbs } = useBreadcrumbs();

  const breakpoint = isChainItemPage ? CHAIN_PAGE_CUSTOM_BREAKPOINT : undefined;

  const isMdDown = useIsMDDown();

  return (
    <>
      <BreadcrumbsBase
        customBreakpoint={breakpoint}
        items={breadcrumbs}
        isPublic={isChainsPublicPage}
      />
      {!isMdDown && <AccountStatus className={classes.accountStatus} />}
    </>
  );
};
