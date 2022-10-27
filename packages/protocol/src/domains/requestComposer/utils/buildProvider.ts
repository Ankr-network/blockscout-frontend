import axios from 'axios';
import { ethers } from 'ethers';
import { AXIOS_DEFAULT_CONFIG } from 'multirpc-sdk';
import Web3 from 'web3';
import { EVMLibraryID } from '../constants';

export const buildProvider = (web3Lib: EVMLibraryID, web3URL: string) => {
  switch (web3Lib) {
    case EVMLibraryID.ETHERS: {
      const proto = web3URL.startsWith('wss') ? 'wss' : 'https';

      return proto === 'wss'
        ? new ethers.providers.WebSocketProvider(web3URL)
        : new ethers.providers.JsonRpcProvider(web3URL);
    }
    case EVMLibraryID.JSON_RPC:
      return axios.create({
        ...AXIOS_DEFAULT_CONFIG,
        baseURL: web3URL,
      });

    case EVMLibraryID.WEB3:
    default: {
      return new Web3(web3URL);
    }
  }
};
