import { useAppSelector } from 'store/useAppSelector';
import { selectConfiguredBlockchains } from 'modules/chains/store/selectors';

import { BlockchainIcon } from '../BlockchainIcon';

export const AllBlockchainsIcons = () => {
  const blockchains = useAppSelector(selectConfiguredBlockchains).map(
    chain => chain.id,
  );

  return <BlockchainIcon isPaddingLeftIgnored blockchains={blockchains} />;
};
