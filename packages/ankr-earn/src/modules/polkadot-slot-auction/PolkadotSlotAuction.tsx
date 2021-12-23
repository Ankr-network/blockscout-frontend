import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { Box, Typography } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode, useState } from 'react';
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
import { NetworkSwitcher } from './layout/components/NetworkSwitcher/NetworkSwitcher';
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
          <div className={classes.header}>
            <div className={classes.tabs}>
              {tabs.map(
                (tab: string): ReactNode => {
                  const isActiveTab: boolean = tab === currentTab;

                  return (
                    <div
                      className={classes.tabArea}
                      key={uid(tab)}
                      onClick={handleChangeTab(tab)}
                    >
                      <Typography
                        className={classNames(classes.tab, {
                          [classes.tabActive]: isActiveTab,
                        })}
                        color={isActiveTab ? 'initial' : 'textSecondary'}
                        variant="h3"
                      >
                        {tab}
                      </Typography>
                    </div>
                  );
                },
              )}
            </div>

            <NetworkSwitcher classRoot={classes.networkSwitcher} />
          </div>

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
