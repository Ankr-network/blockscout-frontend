import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { Box, Typography } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import { t } from 'modules/i18n/utils/intl';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoading } from 'uiKit/QueryLoading';
import { isMainnet } from '../common/const';
import { BlockchainNetworkId } from '../common/types';
import { initialize } from './actions/initialize';
import { GuardComponent } from './components/GuardComponent';
import { MyRewards } from './components/MyRewards';
import { ProjectsList } from './components/ProjectsList';
import { useSlotAuctionSdk } from './hooks/useSlotAuctionSdk';
import { usePolkadotSlotAuctionStyles } from './usePolkadotSlotAuctionStyles';

export const PolkadotSlotAuction = () => {
  const classes = usePolkadotSlotAuctionStyles();

  const { isConnected } = useSlotAuctionSdk();

  const projectsListText = t('polkadot-slot-auction.tabs.projects-list');
  const myRewardsText = t('polkadot-slot-auction.tabs.my-rewards');

  const [currentTab, setCurrentTab] = useState<string>(projectsListText);

  const tabs: string[] = Object.values([projectsListText, myRewardsText]);

  if (!isConnected) {
    tabs.splice(1, 2);
  }

  const handleChangeTab = (newTab: string) => (): void => setCurrentTab(newTab);

  return (
    <Query<SlotAuctionSdk>
      type={initialize.toString()}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      showLoaderDuringRefetch={false}
    >
      {() => (
        <Box width={1280} className={classes.wrapper} px={4}>
          <Box display="flex">
            {(tabs as string[]).map(tab => (
              <Box
                key={uid(tab)}
                onClick={handleChangeTab(tab)}
                mr={4}
                mb={3.5}
              >
                <Typography
                  variant="h3"
                  className={classes.tab}
                  color={tab === currentTab ? 'initial' : 'secondary'}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Box>

          {currentTab === myRewardsText ? (
            <GuardComponent
              availableNetworks={[
                isMainnet
                  ? BlockchainNetworkId.mainnet
                  : BlockchainNetworkId.goerli,
              ]}
              componentSlot={<MyRewards />}
            />
          ) : (
            <ProjectsList />
          )}
        </Box>
      )}
    </Query>
  );
};
