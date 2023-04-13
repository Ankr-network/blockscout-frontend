import { Theme, capitalize } from '@mui/material';
import { t } from '@ankr.com/common';
import { useEffect } from 'react';

import { INDEX_PATH } from 'domains/chains/routes';
import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import { ChainID } from 'modules/chains/types';
import packageJson from '../../../package.json';
import { IApiChain } from 'domains/chains/api/queryChains';
import { isBeacon } from 'modules/chains/utils/isBeacon';
import { selectBeacons } from 'domains/chains/store/chainsSlice';
import { useAppSelector } from 'store/useAppSelector';

const PROTOCOL_URL = `https://www.ankr.com${packageJson.homepage}`;

const renderPrefix = (name: ChainID) => {
  let renderedName = name as string;

  if (name.includes(ChainID.BSC)) {
    renderedName = name.replace(ChainID.BSC, 'BSC');
  }

  return renderedName;
};

const renderNervosName = (chainId: ChainID) => {
  let name = capitalize(chainId);

  if (chainId === ChainID.NERVOS_CKB) {
    name = 'Nervos CKB';
  } else if (chainId === ChainID.NERVOS_GW) {
    name = 'Nervos Godwoken ';
  }

  return name;
};

const renderSecretName = (chainId: ChainID) => {
  let name = capitalize(chainId);

  if (chainId === ChainID.SECRET_COSMOS_REST) {
    name = 'Secret Cosmos REST';
  } else if (chainId === ChainID.SECRET_REST) {
    name = 'Secret Tendermint REST';
  }

  return name;
};

const renderETHName = (chainId: ChainID) => {
  let name = 'Ethereum';

  if (chainId === ChainID.ETH_GOERLI) {
    name = 'Goerli testnet';
  } else if (chainId === ChainID.ETH_RINKEBY) {
    name = 'Rinkeby testnet';
  } else if (chainId === ChainID.ETH_ROPSTEN) {
    name = 'Ropsten testnet';
  } else if (chainId === ChainID.ETH_SEPOLIA) {
    name = 'Sepolia testnet';
  }

  return name;
};

const getSubchainName = (chainId: string) => {
  const index = chainId.indexOf('-');
  const mainChainName = chainId.substring(0, index);
  const subChainName = chainId.substring(index + 1);

  return `${capitalize(mainChainName)}-${capitalize(subChainName)}`;
};

const getTestnetChainName = (chainId: string) => {
  let name = chainId;
  let index = name.indexOf('_');
  let mainnetName = '';
  let testnetName = '';
  let testnetChainName = '';
  let prefix = '';

  while (index > -1) {
    mainnetName = name.substring(0, index);
    testnetName = name.substring(index + 1);
    prefix += `${capitalize(mainnetName)} `;

    if (testnetName.includes('-')) {
      testnetName = getSubchainName(testnetName);
    }

    name = testnetName;
    index = testnetName.indexOf('_');
    testnetChainName = `${prefix}${capitalize(testnetName)}`;
  }

  return testnetChainName;
};

export const getChainName = (chainId: ChainID, beacons: IApiChain[] = []) => {
  let name = capitalize(chainId);

  if (chainId.includes(ChainID.BSC)) {
    name = renderPrefix(chainId);
  }

  if (chainId.includes(ChainID.NERVOS)) {
    name = renderNervosName(chainId);
  } else if (chainId.includes(ChainID.SECRET)) {
    name = renderSecretName(chainId);
  } else if (chainId.includes(ChainID.ETH)) {
    name = renderETHName(chainId);
  } else if (chainId === ChainID.SUI) {
    name = 'Sui Testnet';
  } else if (chainId === ChainID.MANTLE) {
    name = 'Mantle Testnet';
  } else if (chainId === ChainID.POLYGON_ZKEVM) {
    name = 'zkEVM';
  } else if (ADVANCED_API_PATH.includes(chainId)) {
    name = 'Advanced API';
  } else if (chainId === ChainID.ARBITRUM_NOVA) {
    name = 'Arbitrum Nova';
  } else if (chainId.includes('_')) {
    name = getTestnetChainName(renderPrefix(chainId));
  } else if (chainId.includes('-')) {
    name = getSubchainName(renderPrefix(chainId));
  }

  if (isBeacon(chainId)) {
    const beacon = beacons.find(({ id }) => id === chainId);

    name = beacon?.name ?? name;
  }

  return name;
};

const getLocation = (pathname: string, chainsRoutes: string[]): string => {
  let location = '';

  if (pathname === INDEX_PATH) {
    location = 'public.';
  }

  if (
    chainsRoutes.some(route => pathname.includes(route)) ||
    pathname.includes(ADVANCED_API_PATH)
  ) {
    if (pathname === `${INDEX_PATH}eth`) {
      location = 'chain-item-eth.';
    } else if (pathname === `${INDEX_PATH}bsc`) {
      location = 'chain-item-bsc.';
    } else if (pathname === `${INDEX_PATH}fantom`) {
      location = 'chain-item-fantom.';
    } else {
      location = 'chain-item.';
    }
  }

  return location;
};

export const useMetatags = (
  rawPathname: string,
  chainsRoutes: string[],
  currentTheme: Theme,
) => {
  const currentThemeColor = currentTheme.palette.background.default;

  const beacons = useAppSelector(selectBeacons);

  useEffect(() => {
    const themeTag = document.getElementById('meta-theme') as HTMLMetaElement;
    themeTag.content = currentThemeColor;

    const htmlElement = document.getElementsByTagName(
      'html',
    )[0] as HTMLHtmlElement;

    const bodyElement = document.getElementsByTagName(
      'body',
    )[0] as HTMLBodyElement;

    htmlElement.style.backdropFilter = currentThemeColor;
    bodyElement.style.backgroundColor = currentThemeColor;

    const pathname =
      rawPathname === INDEX_PATH ? rawPathname : rawPathname.replace(/\/$/, '');

    const descriptionTag = document.getElementById(
      'meta-description',
    ) as HTMLMetaElement;

    const ogTitle = document.getElementById('meta-og-title') as HTMLMetaElement;
    const ogDescription = document.getElementById(
      'meta-og-description',
    ) as HTMLMetaElement;

    const twitterTitle = document.getElementById(
      'meta-twitter-title',
    ) as HTMLMetaElement;

    const twitterDescription = document.getElementById(
      'meta-twitter-description',
    ) as HTMLMetaElement;

    const ogURL = document.getElementById('meta-og-url') as HTMLMetaElement;
    const twitterURL = document.getElementById(
      'meta-twitter-url',
    ) as HTMLMetaElement;

    ogURL.content = PROTOCOL_URL + pathname;
    twitterURL.content = PROTOCOL_URL + pathname;

    const location = getLocation(pathname, chainsRoutes);

    let name = '';

    if (location.indexOf('chain-item') > -1) {
      const lastIndex = pathname.lastIndexOf('/');
      name = getChainName(
        pathname.substring(lastIndex + 1) as ChainID,
        beacons,
      );
    }

    document.title = t(`meta.${location}title`, { chainId: name });

    if (descriptionTag) {
      descriptionTag.content = t(`meta.${location}description`, {
        chainId: name,
      });
    }

    if (ogTitle) {
      ogTitle.content = t(`meta.${location}og-title`, { chainId: name });
    }

    if (ogDescription) {
      ogDescription.content = t(`meta.${location}og-description`, {
        chainId: name,
      });
    }

    if (twitterTitle) {
      twitterTitle.content = t(`meta.${location}og-title`, { chainId: name });
    }

    if (twitterDescription) {
      twitterDescription.content = t(`meta.${location}og-description`, {
        chainId: name,
      });
    }

    return () => {};
  }, [rawPathname, chainsRoutes, currentThemeColor, beacons]);
};
