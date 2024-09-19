import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { Copy } from '@ankr.com/ui';
import { useDispatch } from 'react-redux';
import { Chain } from '@ankr.com/chains-list';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Dialog } from 'uiKit/Dialog';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { useChainItemHeaderContent } from 'domains/chains/screens/ChainPage/components/ChainItemHeader/hooks/useChainItemHeaderContent';
import { usePrivateChainItem } from 'domains/chains/screens/ChainPage/PrivateChainItemQuery/components/PrivateChainItem/hooks/usePrivateChainItem';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { Endpoints } from 'modules/common/components/GetStartedSection/components/Endpoints';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import {
  JwtManagerToken,
  setSelectedTokenIndex,
} from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ANIMATION_DURATION } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/AccordionItem/hooks/useAccordionItem';
import { getIsHiddenMainnet } from 'domains/projects/screens/Project/components/ProjectChainDetails/hooks/useProjectChainDetails';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { useAppSelector } from 'store/useAppSelector';
import { selectCurrentAddress } from 'domains/auth/store';

import { useCopyEndpointModalStyles } from './useCopyEndpointModalStyles';
import { endpointModalTranslation } from './translation';
import { TokenSelector } from './components/TokenSelector/TokenSelector';

interface ICopyEndpointModalProps {
  chain: Chain;
  userEndpointToken: string;
  jwtTokens: JwtManagerToken[];
  buttonProps?: React.ComponentProps<typeof Button>;
  isProtocolSwitcherHidden?: boolean;
  buttonClassName?: string;
  isIconButton?: boolean;
  hasProjectSelector?: boolean;
}

// eslint-disable-next-line max-lines-per-function
export const CopyEndpointModal = ({
  buttonClassName,
  buttonProps,
  chain,
  hasProjectSelector,
  isIconButton,
  isProtocolSwitcherHidden = false,
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
    isProtocolSwitcherHidden,
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

  const dispatch = useDispatch();

  const address = useAppSelector(selectCurrentAddress);

  const handleSelectTokenIndex = useCallback(
    (newIndex: number) => {
      dispatch(setSelectedTokenIndex({ tokenIndex: newIndex, address }));
    },
    [address, dispatch],
  );

  const currentProjectIndex = useMemo(
    () =>
      jwtTokens.find(token => token.userEndpointToken === userEndpointToken)
        ?.index || 0,
    [jwtTokens, userEndpointToken],
  );

  const onClickEndpointButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      event?.preventDefault();
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

  const { classes, cx } = useCopyEndpointModalStyles();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Button
        size="small"
        className={cx(classes.copyEndpointButton, buttonClassName)}
        {...buttonProps}
        onClick={buttonProps?.onClick || onClickEndpointButton}
      >
        {isIconButton ? <Copy /> : t(keys.copyEndpoint)}
      </Button>
      <Dialog
        open={isOpened}
        onClose={onClickCloseButton}
        title={t(keys.copyEndpoint)}
        paperClassName={classes.endpointsDialog}
      >
        <div
          role="button"
          tabIndex={-1}
          /* stop propagation for click event to avoid parent element click */
          onClick={e => e.stopPropagation()}
        >
          {hasProjectSelector && (
            <TokenSelector
              jwtTokens={jwtTokens}
              currentProjectIndex={currentProjectIndex}
            />
          )}

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
        </div>
      </Dialog>
    </ChainProtocolContext.Provider>
  );
};
