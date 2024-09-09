import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { useTabs } from 'modules/common/hooks/useTabs';
import {
  JwtManagerToken,
  setSelectedTokenIndex,
} from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { useAppSelector } from 'store/useAppSelector';
import { selectCurrentAddress } from 'domains/auth/store';

import { useCopyEndpointModalStyles } from '../../useCopyEndpointModalStyles';

interface ITokenSelectorProps {
  jwtTokens: JwtManagerToken[];
  currentProjectIndex: number;
}

export const TokenSelector = ({
  currentProjectIndex,
  jwtTokens,
}: ITokenSelectorProps) => {
  const dispatch = useDispatch();

  const address = useAppSelector(selectCurrentAddress);

  const handleSelectTokenIndex = useCallback(
    (newIndex: number) => {
      dispatch(setSelectedTokenIndex({ tokenIndex: newIndex, address }));
    },
    [address, dispatch],
  );

  const { classes } = useCopyEndpointModalStyles();

  const tokenTabsData = useMemo(() => {
    return jwtTokens.map(token => ({
      id: token.id,
      title: (isSelected: boolean) => (
        <ChainTypeTab
          content={
            <div className={classes.projectTabContent}>{token.name}</div>
          }
          isSelected={isSelected}
        />
      ),
      onClick: () => handleSelectTokenIndex(token.index),
      onSelect: () => handleSelectTokenIndex(token.index),
    }));
  }, [classes.projectTabContent, handleSelectTokenIndex, jwtTokens]);

  const [tokenTabs, selectedTokenTab] = useTabs<JwtManagerToken>({
    tabs: tokenTabsData,
    initialTabID: jwtTokens.find(token => token.index === currentProjectIndex)
      ?.id,
  });

  return (
    <SecondaryTabs
      className={classes.projectSelector}
      selectedTab={selectedTokenTab}
      tabs={tokenTabs}
      visible
    />
  );
};
