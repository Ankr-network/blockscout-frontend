interface IParseAssets {
  firstAsset: string;
  secondAsset?: string;
}

export const parseAssets = (rawAssets: string): IParseAssets => {
  // todo: improve parsing
  const assets = rawAssets.split('/');
  const firstAsset = assets[0];
  const secondAsset = assets[1]?.match(/[^\s]+/g)?.[0];

  return {
    firstAsset,
    secondAsset,
  };
};
