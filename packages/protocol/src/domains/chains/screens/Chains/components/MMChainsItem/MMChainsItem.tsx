import { ChainsItemProps } from '../ChainsItem/ChainsItemTypes';
import { ChainsItemBase } from '../ChainsItem/ChainsItemBase';
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
        <MMChainsItemLink publicChain={publicChain} urls={urls} />
      }
    />
  );
};
