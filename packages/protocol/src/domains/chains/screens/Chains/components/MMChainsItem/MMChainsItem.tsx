import { ChainsItemProps } from '../ChainsItem/ChainsItemTypes';
import { ChainsItemBase } from '../ChainsItem/ChainsItemBase';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { MMChainsItemLink } from './MMChainsItemLink';
import { useChainsItem } from '../../hooks/useChainsItem';
import { INDEX_MM_PATH } from 'domains/mmChains/routes';

export const MMChainsItem = ({
  publicChain,
  urls,
  chain,
  isPremium,
  ...props
}: ChainsItemProps) => {
  const { credentials } = useAuth();
  const { handleOriginUrlClick } = useChainsItem(
    chain,
    isPremium,
    INDEX_MM_PATH,
  );
  return (
    <ChainsItemBase
      {...props}
      chain={chain}
      isPremium={isPremium}
      handleOriginUrlClick={handleOriginUrlClick}
      chainsItemLink={
        <MMChainsItemLink
          publicChain={publicChain}
          credentials={credentials}
          urls={urls}
        />
      }
    />
  );
};
