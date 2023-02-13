import { Box } from '@material-ui/core';

import { Container } from 'uiKit/Container';

import { ClaimForm } from './components/ClaimForm';
import { useClaimForm } from './hooks/useClaimForm';

export const ClaimEthereum = (): JSX.Element => {
  const {
    balance,
    closeHref,
    isBalanceLoading,
    isLoading,
    nativeAmount,
    totalAmount,
    onSubmit,
  } = useClaimForm();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container maxWidth="780px">
        <ClaimForm
          balance={balance}
          closeHref={closeHref}
          isBalanceLoading={isBalanceLoading}
          isLoading={isLoading}
          nativeAmount={nativeAmount}
          totalAmount={totalAmount}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
};
