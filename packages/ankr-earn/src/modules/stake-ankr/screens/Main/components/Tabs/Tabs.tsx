import { t } from 'common';

import {
  ITabItem,
  Tabs as BaseTabs,
} from 'modules/delegate-stake/components/Tabs';
import { Button } from 'uiKit/Button';

import { ClaimAllUnstakesDialog } from '../ClaimAllUnstakesDialog';

import { useClaim } from './useClaim';
import { useTabsStyles } from './useTabsStyles';

interface ITabProps {
  tabs: ITabItem[];
  activeTab: string;
  claimAllLink?: string;
  handleChangeTab(newTab: string): void;
}

export const Tabs = ({
  tabs,
  activeTab,
  claimAllLink,
  handleChangeTab,
}: ITabProps): JSX.Element => {
  const classes = useTabsStyles();

  const {
    isFewClaims,
    isSingleClaim,
    data,
    isClaimsLoading,
    loading,
    total,
    totalUSD,
    isOpened,
    onClose,
    onOpen,
    onClaim,
  } = useClaim();

  const isShowingButton =
    claimAllLink && !loading && !!data && data.length >= 1;

  return (
    <>
      <BaseTabs
        activeTab={activeTab}
        buttonSlot={
          isShowingButton ? (
            <Button className={classes.btn} variant="text" onClick={onOpen}>
              {t('stake-ankr.tabs.claim-all')}
            </Button>
          ) : undefined
        }
        handleChangeTab={handleChangeTab}
        tabs={tabs}
      />

      <ClaimAllUnstakesDialog
        data={data}
        isClaimsLoading={isClaimsLoading}
        isFewClaims={isFewClaims}
        isSingleClaim={isSingleClaim}
        loading={loading}
        open={isOpened}
        total={total}
        totalUSD={totalUSD}
        onClaim={onClaim}
        onClose={onClose}
      />
    </>
  );
};
