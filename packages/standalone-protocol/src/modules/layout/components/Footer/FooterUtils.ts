import { ChainId } from 'domains/chains/api/chain';
import { visitOtherProjectEvent } from 'modules/analytics/trackMixpanel';

interface LinkItem {
  id?: ChainId;
  href: string;
  event?: () => void;
  text: string;
}

const links: LinkItem[] = [
  {
    id: ChainId.Polygon,
    href: 'https://polygon-rpc.com',
    event: () => visitOtherProjectEvent('Polygon'),
    text: 'footer.polygon',
  },
  {
    id: ChainId.Fantom,
    href: 'https://rpc.ftm.tools',
    event: () => visitOtherProjectEvent('Fantom'),
    text: 'footer.fantom',
  },
  {
    id: ChainId.BSC,
    href: 'https://bscrpc.com',
    event: () => visitOtherProjectEvent('BSC'),
    text: 'footer.bsc',
  },
];

const ETH_LINK: LinkItem = {
  href: 'https://eth.public-rpc.com/',
  text: 'footer.eth',
};

export const getLinksList = (chainId: ChainId): LinkItem[] => {
  return links.map(item => {
    if (item.id === chainId) {
      return ETH_LINK;
    }

    return item;
  });
};
