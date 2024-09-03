import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Dialog } from 'uiKit/Dialog';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { useChainItemHeaderContent } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/hooks/useChainItemHeaderContent';
import { usePrivateChainItem } from 'domains/chains/screens/ChainItem/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { Endpoints } from 'modules/common/components/GetStartedSection/components/Endpoints';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { Chain } from 'modules/chains/types';
import { ANIMATION_DURATION } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/AccordionItem/hooks/useAccordionItem';
import { getIsHiddenMainnet } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';

import { endpointModalTranslation } from './translation';
import { useCopyEndpointModalStyles } from './useCopyEndpointModalStyles';
import { isMultichain } from '../../utils/isMultichain';

interface ICopyEndpointModalProps {
  chain: Chain;
  userEndpointToken: string;
  jwtTokens: JwtManagerToken[];
}

export const CopyEndpointModal = ({
  chain,
  jwtTokens,
  userEndpointToken,
}: ICopyEndpointModalProps) => {
  const { isOpened, onClose, onOpen } = useDialog();

  const {
    chainProtocolContext,
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
    chain,
    isGroupSelectorAutoWidth: true,
    unfilteredChain: chain,
    isProtocolSwitcherHidden: false,
    isHiddenMainnet: getIsHiddenMainnet(chain),
  });

  const { isChainProtocolSwitchEnabled } = chainProtocolContext;

  const { endpointsGroup, placeholder } = useChainItemHeaderContent({
    group,
    isMultiChain: isMultichain(chain.id),
    chain,
    groupID,
    isChainProtocolSwitchEnabled,
  });

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  const currentProjectIndex = useMemo(
    () =>
      jwtTokens.find(token => token.userEndpointToken === userEndpointToken)
        ?.index || 0,
    [jwtTokens, userEndpointToken],
  );

  const onClickEndpointButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      handleSelectTokenIndex(currentProjectIndex);
      setTimeout(onOpen, ANIMATION_DURATION);
    },
    [currentProjectIndex, handleSelectTokenIndex, onOpen],
  );

  const onClickCloseButton = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      onClose();
    },
    [onClose],
  );

  const { keys, t } = useTranslation(endpointModalTranslation);

  const { classes } = useCopyEndpointModalStyles();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Button
        size="small"
        onClick={onClickEndpointButton}
        className={classes.copyEndpointButton}
      >
        {t(keys.copyEndpoint)}
      </Button>
      <Dialog
        open={isOpened}
        onClose={onClickCloseButton}
        title={t(keys.copyEndpoint)}
        paperClassName={classes.endpointsDialog}
      >
        <ChainSelectorContent
          className={classes.chainSelectorControls}
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
          isGroupSelectorAutoWidth={false}
          isSubchainSelectorHidden={isMultichain(chain.id)}
        />

        <Endpoints
          publicChain={chain}
          chainType={chainType}
          group={endpointsGroup}
          placeholder={placeholder}
        />
      </Dialog>
    </ChainProtocolContext.Provider>
  );
};
