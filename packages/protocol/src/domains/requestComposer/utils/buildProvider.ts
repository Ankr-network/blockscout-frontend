import { ethers } from 'ethers';
import Web3 from 'web3';

import { LibraryID } from '../constants';

export const buildProvider = (web3Lib: LibraryID, web3URL: string) => {
  switch (web3Lib) {
    case LibraryID.ETHERS: {
      const proto = web3URL.startsWith('wss') ? 'wss' : 'https';

      return proto === 'wss'
        ? new ethers.providers.WebSocketProvider(web3URL)
        : new ethers.providers.JsonRpcProvider(web3URL);
    }

    case LibraryID.WEB3:
    default: {
      return new Web3(web3URL);
    }
  }
};
