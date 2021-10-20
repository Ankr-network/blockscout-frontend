import React from 'react';
import { Button } from '@material-ui/core';
import { Mutation } from '@redux-requests/react';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

interface ConnectButtonProps {
  isMobile?: boolean;
}

export const ConnectButton = ({ isMobile = false }: ConnectButtonProps) => {
  const { handleConnect, address } = useAuth();

  return (
    <Mutation type={handleConnect.toString()}>
      {({ loading }) =>
        address ? (
          <Button variant="text">{shrinkAddress(address)}</Button>
        ) : (
          <Button
            variant={isMobile ? 'outlined' : 'text'}
            color="primary"
            disableElevation={false}
            onClick={handleConnect}
            disabled={loading}
          >
            {t('header.wallet-button')}
          </Button>
        )
      }
    </Mutation>
  );
};
