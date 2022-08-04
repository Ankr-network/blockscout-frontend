import { Token } from 'modules/common/types/token';
import { Header as BaseHeader } from 'modules/delegate-stake/components/Header';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';

import { useHeader } from './useHeader';

export const Header = (): JSX.Element => {
  const { balance, isLoading, getTokensLink } = useHeader();

  return (
    <BaseHeader
      balance={balance}
      getTokensLink={getTokensLink}
      icon={<AnkrIcon />}
      isLoading={isLoading}
      myStakingLink={RoutesConfig.main.generatePath()}
      nodeProvidersLink={RoutesConfig.providers.generatePath()}
      token={Token.ANKR}
    />
  );
};
