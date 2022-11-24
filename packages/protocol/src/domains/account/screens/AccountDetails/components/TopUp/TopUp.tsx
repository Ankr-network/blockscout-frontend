import { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './TopUpStyles';
import { TopUpBlockHeader } from './TopUpBlockHeader';
import { TopUpTabs } from './TopUpTabs';
import { useRates } from 'domains/account/hooks/useRates';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { EthAddressType } from 'multirpc-sdk';

export interface TopUpProps {
  className?: string;
  header?: ReactNode;
}

export const TopUp = ({
  className,
  header = <TopUpBlockHeader />,
}: TopUpProps) => {
  const classes = useStyles();

  const { handleFetchRates } = useRates();
  const { ethAddressType } = useAuth();

  useOnMount(() => {
    handleFetchRates();
  });

  const canPayOnlyByCard = ethAddressType === EthAddressType.Generated;

  return (
    <Box className={classNames(classes.root, className)}>
      {header}
      <TopUpTabs canPayOnlyByCard={canPayOnlyByCard} />
    </Box>
  );
};
