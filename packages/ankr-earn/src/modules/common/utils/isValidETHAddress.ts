import web3 from 'web3';

export const isValidETHAddress = (address: string): boolean => {
  try {
    web3.utils.toChecksumAddress(address);

    return true;
  } catch {
    return false;
  }
};
