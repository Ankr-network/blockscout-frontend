import { IconButton } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import {
  IRouteClaimData,
  RoutesConfig,
} from 'modules/polkadot-slot-auction/Routes';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { NavLink } from 'uiKit/NavLink';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { fetchCrowdloanById } from '../../actions/fetchCrowdloanById';
import { useCrowdloanById } from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';

import { ClaimForm } from './ClaimForm';
import { ClaimSuccess } from './ClaimSuccess';
import { useProjectsListClaimModalStyles } from './useProjectsListClaimModalStyles';

export const ProjectsListClaimModal = (): JSX.Element | null => {
  const classes = useProjectsListClaimModalStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const { id, network } = useParams<IRouteClaimData>();
  const { isConnected, polkadotAccount } = useSlotAuctionSdk();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessWindow, setIsSuccessWindow] = useState(false);

  const loanId = Number.parseInt(id, 10);
  const parachainBondsCrowdloansPath: string =
    RoutesConfig.crowdloans.generatePath(network);

  const goToParachainBondsCrowdloans = (): void =>
    history.push(parachainBondsCrowdloansPath);

  const { crowdloan, isLoading: isLoadingCrowdloanById } =
    useCrowdloanById(loanId);

  useInitEffect((): void => {
    dispatch(fetchCrowdloanById(loanId));
  });

  if (Number.isNaN(loanId) || !isConnected) {
    goToParachainBondsCrowdloans();

    return null;
  }

  if (isLoadingCrowdloanById) {
    return <QueryLoadingCentered />;
  }

  return (
    <div className={classes.root}>
      <div
        className={classNames(
          classes.containerArea,
          isSuccessWindow && classes.containerSuccessArea,
        )}
      >
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
              bondTokenSymbol={crowdloan?.bondTokenSymbol ?? ''}
              isLoading={isSubmitted}
              loanId={loanId}
              polkadotAccount={polkadotAccount}
              setLoadingFn={setIsSubmitted}
              setNewWindowFn={setIsSuccessWindow}
            />
          ) : (
            <ClaimSuccess
              bondTokenSymbol={crowdloan?.bondTokenSymbol ?? ''}
              loanId={loanId}
            />
          )}
        </div>
      </div>
    </div>
  );
};
