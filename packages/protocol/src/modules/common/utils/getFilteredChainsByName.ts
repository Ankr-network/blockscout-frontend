import { Chain } from 'modules/chains/types';

export const getFilteredChainsByName = (
  chain: Chain,
  searchContent: string,
) => {
  const lowerCaseSearchContent = searchContent.toLowerCase();

  const doesExistChainName = chain.name
    .toLocaleLowerCase()
    .includes(lowerCaseSearchContent);
  const doesExistTestnetName = chain.testnets
    ?.map(testnet => testnet.name.toLocaleLowerCase())
    .some(testnet => testnet.includes(lowerCaseSearchContent));
  const doesExistTestnetExtensionName = chain.testnets
    ?.map(testnet => testnet)
    .filter(testnet => !!testnet)
    ?.map(testnet => testnet.extensions)
    .flat()
    .filter(extension => !!extension)
    ?.map(extension => extension?.name.toLocaleLowerCase())
    ?.some(extension => extension?.includes(lowerCaseSearchContent));
  const doesExistDevnetName = chain.devnets
    ?.map(devnet => devnet.name.toLocaleLowerCase())
    .some(devnet => devnet.includes(lowerCaseSearchContent));
  const doesExistTestnetDevnetName = chain.testnets
    ?.map(testnet => testnet)
    .filter(testnet => !!testnet)
    ?.map(testnet => testnet.devnets)
    .flat()
    .filter(devnet => !!devnet)
    ?.map(devnet => devnet?.name.toLocaleLowerCase())
    ?.some(devnet => devnet?.includes(lowerCaseSearchContent));
  const doesExistOpnodeName = chain.opnodes
    ?.map(opnode => opnode.name.toLocaleLowerCase())
    .some(opnode => opnode.includes(lowerCaseSearchContent));
  const doesExistTestnetOpnodeName = chain.testnets
    ?.map(testnet => testnet)
    .filter(testnet => !!testnet)
    ?.map(testnet => testnet.opnodes)
    .flat()
    .filter(opnode => !!opnode)
    ?.map(opnode => opnode?.name.toLocaleLowerCase())
    ?.some(opnode => opnode?.includes(lowerCaseSearchContent));
  const doesExistExtensionName = chain.extensions
    ?.map(extension => extension.name.toLocaleLowerCase())
    .some(extension => extension.includes(lowerCaseSearchContent));
  const doesExistBeaconName = chain.beacons
    ?.map(beacon => beacon.name.toLocaleLowerCase())
    .some(beacon => beacon.includes(lowerCaseSearchContent));

  return (
    doesExistChainName ||
    doesExistTestnetName ||
    doesExistExtensionName ||
    doesExistTestnetExtensionName ||
    doesExistBeaconName ||
    doesExistDevnetName ||
    doesExistTestnetDevnetName ||
    doesExistOpnodeName ||
    doesExistTestnetOpnodeName
  );
};
