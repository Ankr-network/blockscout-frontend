import { Box, Grid, Typography } from '@material-ui/core';
import { Query } from '@redux-requests/react';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { uid } from 'react-uid';

import { SlotAuctionSdk } from 'polkadot';

import { t } from 'modules/i18n/utils/intl';
import { Container } from 'uiKit/Container';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoading } from 'uiKit/QueryLoading';

import { initialize } from '../../actions/initialize';
import { GuardComponent } from '../../components/GuardComponent';
import { MyRewards } from '../../components/MyRewards';
import { NetworkSwitcher } from '../../components/NetworkSwitcher';
import { ProjectsList } from '../../components/ProjectsList';
import { validETHChainId } from '../../const';

import { usePolkadotSlotAuctionStyles } from './usePolkadotSlotAuctionStyles';

export const PolkadotSlotAuction = (): JSX.Element => {
  const classes = usePolkadotSlotAuctionStyles();

  const projectsListText = t('polkadot-slot-auction.tabs.projects-list');
  const myRewardsText = t('polkadot-slot-auction.tabs.my-rewards');

  const [currentTab, setCurrentTab] = useState<string>(projectsListText);

  const tabs: string[] = Object.values([projectsListText, myRewardsText]);

  const handleChangeTab = (newTab: string) => (): void => setCurrentTab(newTab);

  return (
    <Query<SlotAuctionSdk>
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      showLoaderDuringRefetch={false}
      type={initialize.toString()}
    >
      {() => (
        <Box
          className={classes.wrapper}
          component="section"
          py={{ xs: 5, md: 8 }}
        >
          <Container>
            <Box mb={5}>
              <Grid container alignItems="center" spacing={3}>
                <Grid item md xs={12}>
                  {/* todo: merge with tabs from Boost module */}

                  <div className={classes.tabs}>
                    {tabs.map((tab: string): ReactNode => {
                      const isActiveTab: boolean = tab === currentTab;

                      return (
                        <div
                          key={uid(tab)}
                          className={classes.tabArea}
                          role="button"
                          tabIndex={0}
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

                <Grid item md="auto" xs={12}>
                  <NetworkSwitcher />
                </Grid>
              </Grid>
            </Box>

            {currentTab === myRewardsText ? (
              <GuardComponent
                availableNetworks={[validETHChainId]}
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
