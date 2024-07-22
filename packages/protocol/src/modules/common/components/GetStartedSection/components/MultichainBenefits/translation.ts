import { Locale } from 'modules/i18n';

export const multichainBenefitsTranslation = {
  [Locale.en]: {
    title: 'Methods',
    nftApi: {
      title: 'NFT API',
      description:
        'Request NFT-related data in one click across multiple EVM-compatible chains',
      feature1: 'ankr_getNFTsByOwner',
      feature2: 'ankr_getNFTMetadata',
      feature3: 'ankr_getNFTHolders',
      linkText: 'View all',
    },
    queryApi: {
      title: 'Query API',
      description:
        'Search for info on blocks and block ranges, retrieve transaction details, examine blockchain-wallet interactions, or gather info on internal transactions.',
      feature1: 'ankr_getBlockchainStats',
      feature2: 'ankr_getBlocks',
      feature3: 'ankr_getLogs',
      linkText: 'View all',
    },
    tokenApi: {
      title: 'Token API',
      description:
        'Search for account balance info, analyze currencies used on blockchains, find out token prices or holders, retrieve info on token transfers or price calculations.',
      feature1: 'ankr_getAccountBalance',
      feature2: 'ankr_getCurrencies',
      feature3: 'ankr_getTokenPrice',
      linkText: 'View all',
    },
  },
};
