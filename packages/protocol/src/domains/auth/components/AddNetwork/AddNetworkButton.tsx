import { Fragment, ReactNode } from 'react';
import { Box, Button } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { Chain } from '@ankr.com/chains-list';

import { ButtonMetamask } from 'uiKit/ButtonMetamask';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { Dialog } from 'uiKit/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { hasEvmSubchains } from 'modules/chains/utils/hasEvmSubchains';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectBlockchainBySubchainId,
  selectPublicChainById,
} from 'modules/chains/store/selectors';
import { GuardResolution } from 'modules/common/components/GuardResolution';

import { useAddNetworkButton } from './useAddNetworkButton';
import { useNetworksButtonTranslations } from './translation';
import { useAddNetworkButtonStyles } from './useAddNetworkButtonStyles';

interface IAddNetworkProps {
  chain: Chain;
  className?: string;
  label?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  isEnterprise?: boolean;
  hasChainSelector?: boolean;
  hasPlaceholder?: boolean;
}

export const AddNetworkButton = ({
  chain,
  className,
  hasChainSelector,
  hasPlaceholder,
  isEnterprise,
  label,
  size,
}: IAddNetworkProps) => {
  const { loading } = useAuth();

  const currentChainMainId = useAppSelector(state =>
    selectBlockchainBySubchainId(state, chain.id),
  )?.id;

  const publicChain =
    useAppSelector(state =>
      selectPublicChainById(state, currentChainMainId || chain.id),
    ) || chain;

  const {
    chainProtocolContext,
    chainSubType,
    chainSubTypeTab,
    chainSubTypeTabs,
    chainType,
    chainTypeTab,
    chainTypeTabs,
    group,
    groupID,
    groupTab,
    groupTabs,
    groups,
    selectGroup,
  } = usePrivateChainItem({
    chain: isEnterprise ? chain : publicChain,
    isGroupSelectorAutoWidth: true,
  });

  const handleButtonClick = useAddNetworkButton({
    chain: isEnterprise ? chain : publicChain,
    chainType,
    chainSubType,
    group,
    isEnterprise,
  });

  const { isOpened, onClose, onOpen } = useDialog();

  const { keys, t } = useTranslation(useNetworksButtonTranslations);

  const { classes } = useAddNetworkButtonStyles();

  /* hiding the addNetwork button for networks not supported in MetaMask */
  const shouldHideButton =
    (!handleButtonClick && !hasChainSelector) || !hasEvmSubchains(chain);

  if (shouldHideButton) {
    if (hasPlaceholder) {
      return <Box className={classes.placeholder} />;
    }

    return null;
  }

  const WrapperComponent = hasChainSelector
    ? ChainProtocolContext.Provider
    : Fragment;

  return (
    <GuardResolution protectedResolution="mdDown">
      <WrapperComponent value={chainProtocolContext}>
        <ButtonMetamask
          className={className}
          isDisabled={loading}
          label={label}
          onClick={hasChainSelector ? onOpen : handleButtonClick}
          size={size}
        />

        {hasChainSelector && (
          <Dialog
            open={isOpened}
            onClose={onClose}
            title={t(keys.selectNetwork)}
            paperClassName={classes.addNetworkDialog}
            shouldStopPropagationOnClose
          >
            <ChainSelectorContent
              className={classes.addNetworkChainSelector}
              chainSubTypeTab={chainSubTypeTab}
              chainSubTypeTabs={chainSubTypeTabs}
              chainTypeTab={chainTypeTab}
              chainTypeTabs={chainTypeTabs}
              groupID={groupID}
              groupTab={groupTab}
              groupTabs={groupTabs}
              groups={groups}
              hasGroupSelector={false}
              selectGroup={selectGroup}
              isProtocolSwitcherHidden
              isGroupSelectorAutoWidth={false}
              isSubchainSelectorHidden={isMultichain(chain.id)}
            />

            <Button
              disabled={!handleButtonClick}
              onClick={handleButtonClick}
              startIcon={<Plus />}
            >
              {t(keys.addNetwork)}
            </Button>
          </Dialog>
        )}
      </WrapperComponent>
    </GuardResolution>
  );
};
