import { Button, Container } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { IUnstakeFormValues, UnstakeDialog } from './UnstakeDialog';

export default {
  title: 'modules/StakeCommon/components/UnstakeDialog',
};

export const Default = () => {
  const [isOpened, setIsOpened] = useState(true);

  const onUnstakeClick = () => {
    setIsOpened(true);
  };

  const onCloseClick = () => {
    setIsOpened(false);
  };

  const onSubmit = (values: IUnstakeFormValues) => {
    console.log(values);
  };

  const isLoading = false;

  return (
    <section>
      <Container>
        <Button color="primary" onClick={onUnstakeClick}>
          Unstake
        </Button>

        <UnstakeDialog
          isBalanceLoading={false}
          balance={new BigNumber('23.5678715432314234213')}
          onSubmit={onSubmit}
          onClose={onCloseClick}
          submitDisabled={isLoading}
          isLoading={isLoading}
          endDate={new Date()}
        />
      </Container>
    </section>
  );
};
