import { useRouteMatch } from 'react-router';

import { AccountStatus } from 'modules/common/components/AccountStatus/AccountStatus';
import { Breadcrumbs as BreadcrumbsBase } from 'uiKit/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

import { useBreadcrumbs } from '../BreadcrumbsProvider';
import { useBreadcrumbsStyles } from './useBreadcrumbsStyles';

const CHAIN_PAGE_CUSTOM_BREAKPOINT = 1050;
const chainPagePath = ChainsRoutesConfig.chainDetails.path;

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  const chainPageMatch = useRouteMatch(chainPagePath);

  const isMdDown = useIsMDDown();

  const isChainPage = Boolean(chainPageMatch);
  const hasCustomBreakpoint = isChainPage && !isMdDown;

  const customBreakpoint = hasCustomBreakpoint
    ? CHAIN_PAGE_CUSTOM_BREAKPOINT
    : undefined;

  const { classes } = useBreadcrumbsStyles();

  return (
    <>
      <BreadcrumbsBase
        customBreakpoint={customBreakpoint}
        items={breadcrumbs}
      />
      {!isMdDown && <AccountStatus className={classes.accountStatus} />}
    </>
  );
};
