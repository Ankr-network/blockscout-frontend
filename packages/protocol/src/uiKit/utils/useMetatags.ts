import { useEffect } from 'react';
import { t } from 'modules/i18n/utils/intl';
import { PATH_CHAINS } from 'domains/chains/Routes';
import { PATH_PLAN, PATH_PLAN_DEPOSIT } from 'domains/plan/Routes';
import { PATH_PROVIDERS } from 'domains/nodeProviders/Routes';

const PROTOCOL_URL = 'https://www.ankr.com/protocol';

export const getChainName = (chainId: string) => {
  let name = chainId.charAt(0).toUpperCase() + chainId.slice(1);
  if (chainId === 'eth') {
    name = 'Ethereum'
  } else if (chainId === 'bsc') {
    name = 'BSC';
  }
  return name;
}

const getLocation = (pathname: string):string => {
  let location = '';
  if (new RegExp(`${PATH_CHAINS}[a-z]+/`).test(pathname)) {
    if (pathname === `${PATH_CHAINS}eth/`) {
      location = 'chain-item-eth.';
    } else if (pathname === `${PATH_CHAINS}bsc/`) {
      location = 'chain-item-bsc.';
    } else if (pathname === `${PATH_CHAINS}fantom/`) {
      location = 'chain-item-fantom.';
    } else {
      location = 'chain-item.';
    }
  } else if (pathname === PATH_CHAINS ) {
    location = 'public.';
  } else if (pathname === PATH_PLAN ) {
    location = 'plan.';
  } else if (pathname === PATH_PROVIDERS ) {
    location = 'providers.';
  } else if (pathname === PATH_PLAN_DEPOSIT ) {
    location = 'plan-deposit.'
  }
  return location;
}

export const useMetatags = (pathname: string) => {
  useEffect(() => {
    const descriptionTag = document.getElementById('meta-description',) as HTMLMetaElement;
    const ogTitle = document.getElementById('meta-og-title') as HTMLMetaElement;
    const ogDescription = document.getElementById('meta-og-description') as HTMLMetaElement;
    const twitterTitle = document.getElementById('meta-twitter-title') as HTMLMetaElement;
    const twitterDescription = document.getElementById('meta-twitter-description') as HTMLMetaElement;
    const ogURL = document.getElementById('meta-og-url') as HTMLMetaElement;
    const twitterURL = document.getElementById('meta-twitter-url') as HTMLMetaElement;
    ogURL.content = PROTOCOL_URL + pathname;
    twitterURL.content = PROTOCOL_URL + pathname;

    const location = getLocation(pathname);

    let name = '';
    if (location.indexOf('chain-item') > -1) {
      name = getChainName(pathname.substring(8, pathname.length - 1));
    }
    
    document.title = t(`meta.${location}title`, { chainId: name});

    if (descriptionTag) {
      descriptionTag.content = t(`meta.${location}description`, { chainId: name});
    }

    if (ogTitle) {
      ogTitle.content = t(`meta.${location}og-title`, { chainId: name});
    }

    if (ogDescription) {
      ogDescription.content = t(`meta.${location}og-description`, { chainId: name});
    }

    if (twitterTitle) {
      twitterTitle.content = t(`meta.${location}og-title`, { chainId: name});
    }

    if (twitterDescription) {
      twitterDescription.content = t(`meta.${location}og-description`, { chainId: name});
    }

    return () => {};
  }, [pathname]);
};
