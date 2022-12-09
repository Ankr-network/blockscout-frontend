import { tHTML } from '@ankr.com/common';
import { IRPCCallsConfig } from 'domains/requestComposer/types/tron';
import { tronJSConfig } from './tronJSConfig';

const intlRoot = `request-composer.method-description.tron`;

export const TRON_CALL_CONFIG: IRPCCallsConfig = {
  getblockbylimitnext: {
    description: tHTML(`${intlRoot}.getblockbylimitnext`),
    tron: tronJSConfig.getblockbylimitnext,
  },
  getblockbylatestnum: {
    description: tHTML(`${intlRoot}.getblockbylatestnum`),
    tron: tronJSConfig.getblockbylatestnum,
  },
  broadcasttransaction: {
    description: tHTML(`${intlRoot}.broadcasttransaction`),
    tron: tronJSConfig.broadcasttransaction,
  },
  broadcasthex: {
    description: tHTML(`${intlRoot}.broadcasthex`),
    tron: tronJSConfig.broadcasthex,
  },
  createtransaction: {
    description: tHTML(`${intlRoot}.createtransaction`),
    tron: tronJSConfig.createtransaction,
  },
  deploycontract: {
    description: tHTML(`${intlRoot}.deploycontract`),
    tron: tronJSConfig.deploycontract,
  },
  triggersmartcontract: {
    description: tHTML(`${intlRoot}.triggersmartcontract`),
    tron: tronJSConfig.triggersmartcontract,
  },
  proposalcreate: {
    description: tHTML(`${intlRoot}.proposalcreate`),
    tron: tronJSConfig.proposalcreate,
  },
  exchangecreate: {
    description: tHTML(`${intlRoot}.exchangecreate`),
    tron: tronJSConfig.exchangecreate,
  },
  exchangeinject: {
    description: tHTML(`${intlRoot}.exchangeinject`),
    tron: tronJSConfig.exchangeinject,
  },
  exchangewithdraw: {
    description: tHTML(`${intlRoot}.exchangewithdraw`),
    tron: tronJSConfig.exchangewithdraw,
  },
  exchangetransaction: {
    description: tHTML(`${intlRoot}.exchangetransaction`),
    tron: tronJSConfig.exchangetransaction,
  },
  getnowblock: {
    description: tHTML(`${intlRoot}.getnowblock`),
    tron: tronJSConfig.getnowblock,
  },
  getblockbynum: {
    description: tHTML(`${intlRoot}.getblockbynum`),
    tron: tronJSConfig.getblockbynum,
  },
  getblockbyid: {
    description: tHTML(`${intlRoot}.getblockbyid`),
    tron: tronJSConfig.getblockbyid,
  },
  gettransactionbyid: {
    description: tHTML(`${intlRoot}.gettransactionbyid`),
    tron: tronJSConfig.gettransactionbyid,
  },
  getaccountbalance: {
    description: tHTML(`${intlRoot}.getaccountbalance`),
    tron: tronJSConfig.getaccountbalance,
  },
  gettransactioncountbyblocknum: {
    description: tHTML(`${intlRoot}.gettransactioncountbyblocknum`),
    tron: tronJSConfig.gettransactioncountbyblocknum,
  },
  gettransactioninfobyblocknum: {
    description: tHTML(`${intlRoot}.gettransactioninfobyblocknum`),
    tron: tronJSConfig.gettransactioninfobyblocknum,
  },
  getaccount: {
    description: tHTML(`${intlRoot}.getaccount`),
    tron: tronJSConfig.getaccount,
  },
  getassetissuelist: {
    description: tHTML(`${intlRoot}.getassetissuelist`),
    tron: tronJSConfig.getassetissuelist,
  },
  getpaginatedassetissuelist: {
    description: tHTML(`${intlRoot}.getpaginatedassetissuelist`),
    tron: tronJSConfig.getpaginatedassetissuelist,
  },
  getpaginatedproposallist: {
    description: tHTML(`${intlRoot}.getpaginatedproposallist`),
    tron: tronJSConfig.getpaginatedproposallist,
  },
  getpaginatedexchangelist: {
    description: tHTML(`${intlRoot}.getpaginatedexchangelist`),
    tron: tronJSConfig.getpaginatedexchangelist,
  },
  getcontract: {
    description: tHTML(`${intlRoot}.getcontract`),
    tron: tronJSConfig.getcontract,
  },
  getproposalbyid: {
    description: tHTML(`${intlRoot}.getproposalbyid`),
    tron: tronJSConfig.getproposalbyid,
  },
  listproposals: {
    description: tHTML(`${intlRoot}.listproposals`),
    tron: tronJSConfig.listproposals,
  },
  getaccountresource: {
    description: tHTML(`${intlRoot}.getaccountresource`),
    tron: tronJSConfig.getaccountresource,
  },
  getexchangebyid: {
    description: tHTML(`${intlRoot}.getexchangebyid`),
    tron: tronJSConfig.getexchangebyid,
  },
  listexchanges: {
    description: tHTML(`${intlRoot}.listexchanges`),
    tron: tronJSConfig.listexchanges,
  },
  getchainparameters: {
    description: tHTML(`${intlRoot}.getchainparameters`),
    tron: tronJSConfig.getchainparameters,
  },
  getdelegatedresource: {
    description: tHTML(`${intlRoot}.getdelegatedresource`),
    tron: tronJSConfig.getdelegatedresource,
  },
  getdelegatedresourceaccountindex: {
    description: tHTML(`${intlRoot}.getdelegatedresourceaccountindex`),
    tron: tronJSConfig.getdelegatedresourceaccountindex,
  },
  getaccountbyid: {
    description: tHTML(`${intlRoot}.getaccountbyid`),
    tron: tronJSConfig.getaccountbyid,
  },
  getdeferredtransactionbyid: {
    description: tHTML(`${intlRoot}.getdeferredtransactionbyid`),
    tron: tronJSConfig.getdeferredtransactionbyid,
  },
  getdeferredtransactioninfobyid: {
    description: tHTML(`${intlRoot}.getdeferredtransactioninfobyid`),
    tron: tronJSConfig.getdeferredtransactioninfobyid,
  },
  triggerconstantcontract: {
    description: tHTML(`${intlRoot}.triggerconstantcontract`),
    tron: tronJSConfig.triggerconstantcontract,
  },
  getmerkletreevoucherinfo: {
    description: tHTML(`${intlRoot}.getmerkletreevoucherinfo`),
    tron: tronJSConfig.getmerkletreevoucherinfo,
  },
  easytransferbyprivate: {
    description: tHTML(`${intlRoot}.easytransferbyprivate`),
    tron: tronJSConfig.easytransferbyprivate,
    disabled: true,
  },
  easytransferassetbyprivate: {
    description: tHTML(`${intlRoot}.easytransferassetbyprivate`),
    tron: tronJSConfig.easytransferassetbyprivate,
    disabled: true,
  },
  easytransfer: {
    description: tHTML(`${intlRoot}.easytransfer`),
    tron: tronJSConfig.easytransfer,
    disabled: true,
  },
  easytransferasset: {
    description: tHTML(`${intlRoot}.easytransferasset`),
    tron: tronJSConfig.easytransferasset,
    disabled: true,
  },
  gettransactionsign: {
    description: tHTML(`${intlRoot}.gettransactionsign`),
    tron: tronJSConfig.gettransactionsign,
    disabled: true,
  },
  createaddress: {
    description: tHTML(`${intlRoot}.createaddress`),
    tron: tronJSConfig.createaddress,
    disabled: true,
  },
  listnodes: {
    description: tHTML(`${intlRoot}.listnodes`),
    tron: tronJSConfig.listnodes,
    disabled: true,
  },
  generateaddress: {
    description: tHTML(`${intlRoot}.generateaddress`),
    tron: tronJSConfig.generateaddress,
    disabled: true,
  },
  getnodeinfo: {
    description: tHTML(`${intlRoot}.getnodeinfo`),
    tron: tronJSConfig.getnodeinfo,
    disabled: true,
  },
  addtransactionsign: {
    description: tHTML(`${intlRoot}.addtransactionsign`),
    tron: tronJSConfig.addtransactionsign,
    disabled: true,
  },
  getakfromask: {
    description: tHTML(`${intlRoot}.getakfromask`),
    tron: tronJSConfig.getakfromask,
    disabled: true,
  },
  getnkfromnsk: {
    description: tHTML(`${intlRoot}.getnkfromnsk`),
    tron: tronJSConfig.getnkfromnsk,
    disabled: true,
  },
  getspendingkey: {
    description: tHTML(`${intlRoot}.getspendingkey`),
    tron: tronJSConfig.getspendingkey,
    disabled: true,
  },
  getexpandedspendingkey: {
    description: tHTML(`${intlRoot}.getexpandedspendingkey`),
    tron: tronJSConfig.getexpandedspendingkey,
    disabled: true,
  },
  getdiversifier: {
    description: tHTML(`${intlRoot}.getdiversifier`),
    tron: tronJSConfig.getdiversifier,
    disabled: true,
  },
  getincomingviewingkey: {
    description: tHTML(`${intlRoot}.getincomingviewingkey`),
    tron: tronJSConfig.getincomingviewingkey,
    disabled: true,
  },
  createspendauthsig: {
    description: tHTML(`${intlRoot}.createspendauthsig`),
    tron: tronJSConfig.createspendauthsig,
    disabled: true,
  },
  getnewshieldedaddress: {
    description: tHTML(`${intlRoot}.getnewshieldedaddress`),
    tron: tronJSConfig.getnewshieldedaddress,
    disabled: true,
  },
  createshieldedtransaction: {
    description: tHTML(`${intlRoot}.createshieldedtransaction`),
    tron: tronJSConfig.createshieldedtransaction,
    disabled: true,
  },
  createshieldedcontractparameters: {
    description: tHTML(`${intlRoot}.createshieldedcontractparameters`),
    tron: tronJSConfig.createshieldedcontractparameters,
    disabled: true,
  },
  createshieldedcontractparameterswithoutask: {
    description: tHTML(
      `${intlRoot}.createshieldedcontractparameterswithoutask`,
    ),
    tron: tronJSConfig.createshieldedcontractparameterswithoutask,
    disabled: true,
  },
  scanshieldedtrc20notesbyivk: {
    description: tHTML(`${intlRoot}.scanshieldedtrc20notesbyivk`),
    tron: tronJSConfig.scanshieldedtrc20notesbyivk,
    disabled: true,
  },
  scanshieldedtrc20notesbyovk: {
    description: tHTML(`${intlRoot}.scanshieldedtrc20notesbyovk`),
    tron: tronJSConfig.scanshieldedtrc20notesbyovk,
    disabled: true,
  },
  isshieldedtrc20contractnotespent: {
    description: tHTML(`${intlRoot}.isshieldedtrc20contractnotespent`),
    tron: tronJSConfig.isshieldedtrc20contractnotespent,
    disabled: true,
  },
};
