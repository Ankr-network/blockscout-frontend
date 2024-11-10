import { Plus } from '@ankr.com/ui';
import { Button } from '@mui/material';

import { AdvancedApiInfoTabs } from 'domains/chains/screens/ChainPage/components/ChainItemSections/components/AdvancedApiInfoTabs';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { ChainItemHeader } from 'domains/chains/screens/ChainPage/components/ChainItemHeader';
import { ChainProjectsSection } from 'domains/chains/screens/ChainPage/components/ChainProjectsSection';
import { ChainProjectsSidebar } from 'domains/chains/screens/ChainPage/components/ChainProjectsSidebar';
import { GuardResolution } from 'modules/common/components/GuardResolution';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { H1Tag } from 'uiKit/H1Tag';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/types';
import { MultiChainBenefits } from 'modules/common/components/GetStartedSection/components/MultichainBenefits';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { UsageDataSection } from 'domains/chains/screens/ChainPage/components/UsageDataSection';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { useChainItemBreadcrumbs } from 'domains/chains/screens/ChainPage/hooks/useChainItemBreadcrumbs';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useRedirectToAdvancedApi } from 'domains/chains/screens/ChainPage/hooks/useRedirectToAdvancedApi';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';

import { privateChainItemTranslation } from './translation';
import { usePrivateChainItem } from './hooks/usePrivateChainItem';

export interface ChainItemProps {
  data: IPrivateChainItemDetails;
}

export const PrivateChainItem = ({ data }: ChainItemProps) => {
  const {
    isOpened: isOpenedPlansDialog,
    onClose: onClosePlansDialog,
    onOpen: onOpenPlansDialog,
  } = useUpgradePlanDialog();

  const {
    isOpened: isOpenedAddToProjectsSidebar,
    onClose: onCloseAddToProjectsSidebar,
    onOpen: onOpenAddToProjectsDialog,
  } = useDialog();

  const { keys, t } = useTranslation(privateChainItemTranslation);

  const addToProjectButton = (
    <GuardResolution protectedResolution="smDown">
      <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
        <Button
          size="medium"
          variant="outlined"
          onClick={onOpenAddToProjectsDialog}
          startIcon={<Plus />}
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {t(keys.addToProject)}
        </Button>
      </GuardUserGroup>
    </GuardResolution>
  );

  const { chain, headerContent, name, subchainLabels } = usePrivateChainItem({
    ...data,
    shouldExpandFlareTestnets: false,
    onBlockedTabClick: onOpenPlansDialog,
    isGroupSelectorAutoWidth: true,
    shouldHideEndpoints: true,
    addToProjectButton,
    isCodeExampleHidden: true,
    isProtocolSwitcherHidden: false,
  });

  useRedirectToAdvancedApi();

  useChainItemBreadcrumbs(chain.name);

  const { jwts, jwtsLoading } = useJWTsManager();
  const hasNoJWTs = jwts.length === 0;

  const { projectsWhitelistsBlockchains: projectsWithBlockchains } =
    useProjectsWhitelistsBlockchains({
      projects: jwts,
      skipFetching: hasNoJWTs || jwtsLoading,
    });

  return (
    <>
      <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
      <ChainItemHeader headerContent={headerContent} />
      <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
        <ChainProjectsSection
          chain={chain}
          onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
        />
      </GuardUserGroup>
      {isMultichain(chain.id) && (
        <>
          <AdvancedApiInfoTabs />
          <MultiChainBenefits />
        </>
      )}
      <UsageDataSection chain={chain} />
      <PlansDialog open={isOpenedPlansDialog} onClose={onClosePlansDialog} />
      <ChainProjectsSidebar
        chain={chain}
        isOpenedAddToProjectsSidebar={isOpenedAddToProjectsSidebar}
        jwts={jwts}
        onCloseAddToProjectsSidebar={onCloseAddToProjectsSidebar}
        projectsWithBlockchains={projectsWithBlockchains}
        subchainLabels={subchainLabels}
      />
    </>
  );
};
