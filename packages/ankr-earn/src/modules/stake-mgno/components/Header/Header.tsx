import { Token } from 'modules/common/types/token';
import { Header as BaseHeader } from 'modules/delegate-stake/components/Header';
import { RoutesConfig } from 'modules/stake-mgno/Routes';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { useHeader } from './useHeader';

export const Header = (): JSX.Element => {
  const { balance, isLoading, getTokensLink } = useHeader();

  return (
    <BaseHeader
      balance={balance}
      getTokensLink={getTokensLink}
      icon={<MGNOIcon />}
      isLoading={isLoading}
      myStakingLink={RoutesConfig.main.generatePath()}
      nodeProvidersLink={' '}
      token={Token.mGNO}
    />
  );
};
