import { Button, Container } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { IUnstakeFormValues, UnstakeDialog } from './UnstakeDialog';

export default {
  title: 'modules/StakeCommon/components/UnstakeDialog',
};

export const Default = (): JSX.Element => {
  const [, setIsOpened] = useState(true);

  const onUnstakeClick = () => {
    setIsOpened(true);
  };

  const onCloseClick = () => {
    setIsOpened(false);
  };

  const onSubmit = (values: IUnstakeFormValues) => {
    // eslint-disable-next-line no-console
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
          balance={new BigNumber('23.5678715432314234213')}
          endDate={new Date()}
          isBalanceLoading={false}
          isLoading={isLoading}
          submitDisabled={isLoading}
          onClose={onCloseClick}
          onSubmit={onSubmit}
        />
      </Container>
    </section>
  );
};
