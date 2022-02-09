import { IconButton } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { fetchCrowdloanById } from '../../actions/fetchCrowdloanById';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { useFetchPolkadotAccounts } from '../../hooks/useFetchPolkadotAccounts';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { IRouteClaimData, RoutesConfig } from '../../Routes';
import { ClaimForm } from './ClaimForm';
import { ClaimSuccess } from './ClaimSuccess';
import { useMyRewardsClaimModalStyles } from './useMyRewardsClaimModalStyles';

const ETH_PROJECTS: string[] = ['moonbeam'];

export const MyRewardsClaimModal = () => {
  const classes = useMyRewardsClaimModalStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const { id, network } = useParams<IRouteClaimData>();
  const { isConnected, polkadotAccount } = useSlotAuctionSdk();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessWindow, setIsSuccessWindow] = useState(false);
  const [successLink, setSuccessLink] = useState('');

  const loanId: number = Number.parseInt(id, 10);
  const parachainBondsCrowdloansPath: string = useMemo(
    (): string => RoutesConfig.crowdloans.generatePath(network),
    [network],
  );

  const goToParachainBondsCrowdloans = (): void =>
    history.push(parachainBondsCrowdloansPath);

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();

    return null;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const { crowdloan, isLoading: isLoadingCrowdloanById } =
    useCrowdloanById(loanId);
  const { isLoading: isLoadingFetchPolkadotAccounts, polkadotAccounts } =
    useFetchPolkadotAccounts();
  /* eslint-enable react-hooks/rules-of-hooks */

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isETHProject: boolean = useMemo(
    (): boolean =>
      ETH_PROJECTS.includes(crowdloan?.rewardTokenName?.toLowerCase()),
    [crowdloan?.rewardTokenName],
  );

  if (!polkadotAccounts.length) {
    goToParachainBondsCrowdloans();

    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useInitEffect((): void => {
    dispatch(fetchCrowdloanById(loanId));
  });

  if (isLoadingCrowdloanById || isLoadingFetchPolkadotAccounts) {
    return <QueryLoadingCentered />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.containerArea}>
        {!isSubmitted && (
          <div className={classes.closeArea}>
            <IconButton className={classes.closeBtn}>
              <NavLink href={parachainBondsCrowdloansPath}>
                <CancelIcon size="md" />
              </NavLink>
            </IconButton>
          </div>
        )}

        <div className={classes.bodyArea}>
          {!isSuccessWindow ? (
            <ClaimForm
              isETHProject={isETHProject}
              isLoading={isSubmitted}
              loanId={loanId}
              network={network}
              polkadotAccount={polkadotAccount}
              polkadotAccounts={polkadotAccounts}
              rewardTokenName={crowdloan?.rewardTokenName ?? ''}
              rewardTokenSymbol={crowdloan?.rewardTokenSymbol ?? ''}
              setLoadingFn={setIsSubmitted}
              setNewWindowFn={setIsSuccessWindow}
              setSuccessLinkFn={setSuccessLink}
            />
          ) : (
            <ClaimSuccess
              isETHProject={isETHProject}
              rewardTokenName={crowdloan?.rewardTokenName ?? ''}
              rewardTokenSymbol={crowdloan?.rewardTokenSymbol ?? ''}
              successLink={successLink}
            />
          )}
        </div>
      </div>
    </div>
  );
};
