import { useAppSelector } from 'store/useAppSelector';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';

import { BlockchainIcon } from '../BlockchainIcon';

export const AllBlockchainsIcons = () => {
  const blockchains = useAppSelector(selectPublicBlockchains).map(
    chain => chain.id,
  );

  return <BlockchainIcon isPaddingLeftIgnored blockchains={blockchains} />;
};
