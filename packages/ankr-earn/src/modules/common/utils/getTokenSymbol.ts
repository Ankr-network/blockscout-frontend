// todo: https://ankrnetwork.atlassian.net/browse/STAKAN-2338 token name must be received from the contract
/**
 * Utility to get the name of the token that would be added
 * to a client's wallet.
 */
export const getTokenSymbol = (token: string): string => {
  switch (token) {
    case 'aAVAXc':
      return 'ankrAVAX';
    case 'aETHc':
      return 'ankrETH';
    case 'aBNBc':
      return 'ankrBNB';
    case 'aMATICc':
      return 'ankrMATIC';
    case 'aFTMc':
      return 'ankrFTM';
    default:
      return token;
  }
};
