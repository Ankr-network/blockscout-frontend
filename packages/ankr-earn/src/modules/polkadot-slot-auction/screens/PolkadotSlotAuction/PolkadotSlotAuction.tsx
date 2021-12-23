import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { Box, Grid, Typography } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode, useState } from 'react';
import { uid } from 'react-uid';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoading } from 'uiKit/QueryLoading';
import { isMainnet } from '../../../common/const';
import { BlockchainNetworkId } from '../../../common/types';
import { initialize } from '../../actions/initialize';
import { GuardComponent } from '../../components/GuardComponent';
import { MyRewards } from '../../components/MyRewards';
import { NetworkSwitcher } from '../../components/NetworkSwitcher';
import { ProjectsList } from '../../components/ProjectsList';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
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
        <Box
          component="section"
          className={classes.wrapper}
          py={{ xs: 5, md: 8 }}
        >
          <Container>
            <Box mb={5}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md>
                  {/* todo: merge with tabs from Boost module */}
                  <div className={classes.tabs}>
                    {tabs.map((tab: string): ReactNode => {
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
                    })}
                  </div>
                </Grid>

                <Grid item xs={12} md="auto">
                  <NetworkSwitcher />
                </Grid>
              </Grid>
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
          </Container>
        </Box>
      )}
    </Query>
  );
};
