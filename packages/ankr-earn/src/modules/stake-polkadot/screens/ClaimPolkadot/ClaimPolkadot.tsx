import React from 'react';

import { StakeSuccessDialog } from 'modules/stake/components/StakeSuccessDialog';
import { Container } from 'uiKit/Container';

import { IPolkadotRouteLoadableComponentProps } from '../../types';

import { ClaimForm } from './components/ClaimForm';
import { useClaimForm } from './hooks/useClaimForm';
import { useClaimPolkadotStyles } from './useClaimPolkadotStyles';

export const ClaimPolkadot = ({
  network,
}: IPolkadotRouteLoadableComponentProps): JSX.Element => {
  const classes = useClaimPolkadotStyles();

  const {
    amount,
    ethToken,
    isLoadingClaim,
    isSuccessOpened,
    polkadotAddress,
    successTitle,
    onAddTokenClick,
    onFormSubmit,
    onSuccessClose,
  } = useClaimForm(network);

  return (
    <section className={classes.root}>
      {!isSuccessOpened ? (
        <ClaimForm
          amount={amount}
          ethToken={ethToken}
          isLoadingClaim={isLoadingClaim}
          polkadotAddress={polkadotAddress}
          onFormSubmit={onFormSubmit}
        />
      ) : (
        <Container>
          <StakeSuccessDialog
            title={successTitle}
            tokenName={ethToken}
            onAddTokenClick={onAddTokenClick}
            onClose={onSuccessClose}
          />
        </Container>
      )}
    </section>
  );
};
