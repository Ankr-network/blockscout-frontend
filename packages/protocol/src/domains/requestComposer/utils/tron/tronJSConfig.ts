import {
  renderBroadcasttransactionParameters,
  renderGetaccountbalanceParameters,
  renderProposalcreateParameter,
} from 'domains/requestComposer/components/composers/TronRequestComposer/TronLibraryContent/LibraryContentUtils';
import { ILibraryConfig } from 'domains/requestComposer/types/tron';
import { safeStringifyJSON } from 'modules/common/utils/safeStringifyJSON';

export enum Method {
  Post = 'POST',
  Get = 'GET',
}

export enum TronNodeUrl {
  FullNode = '/wallet/',
  SolidityNode = '/walletsolidity/',
}

const PostTemplate = (url: string, args: string, solidityUrl?: string) => {
  const parameter = args;

  return `# FullNode API:
curl -X POST '${url}' -d '${parameter}'

${
  solidityUrl
    ? `# SolidityNode API:
curl -X POST '${solidityUrl}' -d '${parameter}'`
    : ''
}`;
};

const GetTemplate = (url: string, solidityUrl?: string) => {
  return `# FullNode API:
curl -X GET ${url}

${
  solidityUrl &&
  `# SolidityNode API:
curl -X GET ${solidityUrl}`
}`;
};

export const tronJSConfig: ILibraryConfig = {
  getblockbylimitnext: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getblockbylimitnext`,
        safeStringifyJSON(args),
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'startNum',
        description: `The start block height, itself included`,
        placeholder: 'i.e. 1',
      },
      {
        type: 'number',
        fieldName: 'endNum',
        description: `The end block height, itself not included`,
        placeholder: 'i.e. 2',
      },
    ],
  },
  getblockbylatestnum: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getblockbylatestnum`,
        safeStringifyJSON(args),
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'num',
        description: `The number of the blocks expected to return`,
        placeholder: 'i.e. 5',
      },
    ],
  },
  broadcasttransaction: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}broadcasttransaction`,
        safeStringifyJSON(renderBroadcasttransactionParameters(args)),
        `${url}${TronNodeUrl.SolidityNode}broadcasttransaction`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'transaction',
        description: `Transaction after sign`,
        placeholder: `{
          "signature": [
            "97c825b41c77de2a8bd65b3df55cd4c0df59c307c0187e42321dcc1cc455ddba583dd9502e17cfec5945b34cad0511985a6165999092a6dec84c2bdd97e649fc01"
          ],
          "txID": "454f156bf1256587ff6ccdbc56e64ad0c51e4f8efea5490dcbc720ee606bc7b8",
          "raw_data": {
            "contract": [
              {
                "parameter": {
                  "value": {
                    "amount": 1000,
                    "owner_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
                    "to_address": "41d1e7a6bc354106cb410e65ff8b181c600ff14292"
                  },
                  "type_url": "type.googleapis.com/protocol.TransferContract"
                },
                "type": "TransferContract"
              }
            ],
            "ref_block_bytes": "267e",
            "ref_block_hash": "9a447d222e8de9f2",
            "expiration": 1530893064000,
            "timestamp": 1530893006233
          }
        }`,
      },
    ],
  },
  broadcasthex: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}broadcasthex`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}broadcasthex`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'transaction',
        description: `Transaction hex after sign`,
        placeholder:
          'i.e. 0A8A010A0202DB2208C89D4811359A28004098A4E0A6B52D5A730802126F0A32747970652E676F6F676C65617069732E636F6D2F70726F746F636F6C2E5472616E736665724173736574436F6E747261637412390A07313030303030311215415A523B449890854C8FC460AB602DF9F31FE4293F1A15416B0580DA195542DDABE288FEC436C7D5AF769D24206412418BF3F2E492ED443607910EA9EF0A7EF79728DAAAAC0EE2BA6CB87DA38366DF9AC4ADE54B2912C1DEB0EE6666B86A07A6C7DF68F1F9DA171EEE6A370B3CA9CBBB00',
      },
    ],
  },
  createtransaction: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}createtransaction`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}createtransaction`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'to_address',
        description: `To address, default hexString`,
        placeholder: 'i.e. 41e9d79cc47518930bc322d9bf7cddd260a0260a8d',
      },
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address, default hexString`,
        placeholder: 'i.e. 41D1E7A6BC354106CB410E65FF8B181C600FF14292',
      },
      {
        type: 'number',
        fieldName: 'amount',
        description: `Transfer amount`,
        placeholder: 'i.e. 1000',
      },
    ],
  },
  deploycontract: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}deploycontract`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}deploycontract`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'abi',
        description: `Abi`,
        placeholder: `i.e. [{"constant":false,"inputs":[{"name":"key","type":"uint256"},{"name":"value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"uint256"}],"name":"get","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]`,
      },
      {
        type: 'textarea',
        fieldName: 'bytecode',
        description: `Bytecode, default hexString`,
        placeholder:
          'i.e. 608060405234801561001057600080fd5b5060de8061001f6000396000f30060806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631ab06ee58114604d5780639507d39a146067575b600080fd5b348015605857600080fd5b506065600435602435608e565b005b348015607257600080fd5b50607c60043560a0565b60408051918252519081900360200190f35b60009182526020829052604090912055565b600090815260208190526040902054905600a165627a7a72305820fdfe832221d60dd582b4526afa20518b98c2e1cb0054653053a844cf265b25040029',
      },
      {
        type: 'textfield',
        fieldName: 'parameter',
        description:
          'The list of the parameters of the constructor, It should be converted hexString after encoded according to ABI encoder. If constructor has no parameter, this can be optional',
        placeholder: '',
      },
      {
        type: 'number',
        fieldName: 'call_value',
        description: `The TRX transfer to the contract for each call`,
        placeholder: 'i.e. 100',
      },
      {
        type: 'textfield',
        fieldName: 'name',
        description: `Contract name`,
        placeholder: 'i.e. SomeContract',
      },
      {
        type: 'number',
        fieldName: 'consume_user_resource_percent',
        description: `Consume user's resource percentage. It should be an integer between [0, 100]. if 0, means it does not consume user's resource until the developer's resource has been used up`,
        placeholder: 'i.e. 30',
      },
      {
        type: 'number',
        fieldName: 'fee_limit',
        description: `The maximum TRX burns for resource consumption`,
        placeholder: 'i.e. 10',
      },
      {
        type: 'number',
        fieldName: 'origin_energy_limit',
        description:
          'The maximum resource consumption of the creator in one execution or creation',
        placeholder: 'i.e. 10',
      },
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address of the contract, default hexString`,
        placeholder: 'i.e. 41D1E7A6BC354106CB410E65FF8B181C600FF14292',
      },
    ],
  },
  triggersmartcontract: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}triggersmartcontract`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}triggersmartcontract`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'contract_address',
        description: `Contract address, default hexString`,
        placeholder: 'i.e. 4189139CB1387AF85E3D24E212A008AC974967E561',
      },
      {
        type: 'textarea',
        fieldName: 'function_selector',
        description: `Function call, must not leave a blank space`,
        placeholder: 'i.e. set(uint256,uint256)',
      },
      {
        type: 'textarea',
        fieldName: 'parameter',
        description: `The parameter passed to 'function_selector', the format must match with the VM's requirement. You can use a js tool provided by remix to convert a parameter like [1,2] to the format that VM requires`,
        placeholder:
          'i.e. 00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
      },
      {
        type: 'number',
        fieldName: 'fee_limit',
        description: `The maximum TRX burns for resource consumption`,
        placeholder: 'i.e. 10',
      },
      {
        type: 'number',
        fieldName: 'call_value',
        description: `The TRX transfer to the contract for each call`,
        placeholder: 'i.e. 100',
      },
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description:
          'Owner address that triggers the contract, default hexString',
        placeholder: 'i.e. 41D1E7A6BC354106CB410E65FF8B181C600FF14292',
      },
    ],
  },
  proposalcreate: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}proposalcreate`,
        safeStringifyJSON(renderProposalcreateParameter(args)),
        `${url}${TronNodeUrl.SolidityNode}proposalcreate`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Creator address`,
        placeholder: 'i.e. 419844F7600E018FD0D710E2145351D607B3316CE9',
      },
      {
        type: 'textarea',
        fieldName: 'parameters',
        description: `Proposal parameters`,
        placeholder: `i.e. [{"key": 0,"value": 100000},{"key": 1,"value": 2}]`,
      },
    ],
  },
  exchangecreate: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}exchangecreate`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}exchangecreate`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address of the exchange pair, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
      {
        type: 'textarea',
        fieldName: 'first_token_id',
        description: `The first token's id, default hexString`,
        placeholder: 'i.e. token_a',
      },
      {
        type: 'number',
        fieldName: 'first_token_balance',
        description: `The first token's balance`,
        placeholder: 'i.e. 100',
      },
      {
        type: 'textarea',
        fieldName: 'second_token_id',
        description: `The second token's id, default hexString`,
        placeholder: 'i.e. token_b',
      },
      {
        type: 'number',
        fieldName: 'second_token_balance',
        description: `The second token's balance`,
        placeholder: 'i.e. 200',
      },
    ],
  },
  exchangeinject: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}exchangeinject`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}exchangeinject`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address of the exchange pair, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
      {
        type: 'number',
        fieldName: 'exchange_id',
        description: `Exchange pair id`,
        placeholder: 'i.e. 1',
      },
      {
        type: 'textarea',
        fieldName: 'token_id',
        description: `Token id, default hexString`,
        placeholder: 'i.e. 74726f6e6e616d65',
      },
      {
        type: 'number',
        fieldName: 'quant',
        description: `Token inject amount`,
        placeholder: 'i.e. 100',
      },
    ],
  },
  exchangewithdraw: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}exchangewithdraw`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}exchangewithdraw`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address of the exchange pair, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
      {
        type: 'number',
        fieldName: 'exchange_id',
        description: `Exchange pair id`,
        placeholder: 'i.e. 1',
      },
      {
        type: 'textarea',
        fieldName: 'token_id',
        description: `Token id, default hexString`,
        placeholder: 'i.e. 74726f6e6e616d65',
      },
      {
        type: 'number',
        fieldName: 'quant',
        description: `Token withdraw amount`,
        placeholder: 'i.e. 100',
      },
    ],
  },
  exchangetransaction: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}exchangetransaction`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}exchangetransaction`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description: `Owner address of the exchange pair, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
      {
        type: 'number',
        fieldName: 'exchange_id',
        description: `Exchange pair id`,
        placeholder: 'i.e. 1',
      },
      {
        type: 'textarea',
        fieldName: 'token_id',
        description: `Token id, default hexString`,
        placeholder: 'i.e. 74726f6e6e616d65',
      },
      {
        type: 'number',
        fieldName: 'quant',
        description: `Token inject amount`,
        placeholder: 'i.e. 100',
      },
      {
        type: 'number',
        fieldName: 'expected',
        description: `Expected token amount to get`,
        placeholder: 'i.e. 10',
      },
    ],
  },
  getnowblock: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}getnowblock`,
        `${url}${TronNodeUrl.SolidityNode}getnowblock`,
      );
    },
  },
  getblockbynum: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}getblockbynum`,
        `${url}${TronNodeUrl.SolidityNode}getblockbynum`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'num',
        description: `Block height`,
        placeholder: 'i.e. 100',
      },
    ],
  },
  getblockbyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getblockbyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getblockbyid`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'value',
        description: `Block id`,
        placeholder:
          'i.e. 0000000000038809c59ee8409a3b6c051e369ef1096603c7ee723c16e2376c73',
      },
    ],
  },
  gettransactionbyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}gettransactionbyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}gettransactionbyid`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'value',
        description: `Transaction id`,
        placeholder:
          'i.e. 0000000000038809c59ee8409a3b6c051e369ef1096603c7ee723c16e2376c73',
      },
    ],
  },
  getaccountbalance: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getaccountbalance`,
        safeStringifyJSON(renderGetaccountbalanceParameters(args)),
        `${url}${TronNodeUrl.SolidityNode}getaccountbalance`,
      );
    },
    args: [
      {
        type: 'textfield',
        fieldName: 'account_identifier',
        description: `The account address`,
        placeholder: `i.e. {"address": "TLLM21wteSPs4hKjbxgmH1L6poyMjeTbHm"}`,
      },
      {
        type: 'textarea',
        fieldName: 'block_identifier',
        description: `The block number`,
        placeholder: `i.e. {"hash": "0000000000010c4a732d1e215e87466271e425c86945783c3d3f122bfa5affd9","number": 68682}`,
      },
    ],
  },
  gettransactioncountbyblocknum: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}gettransactioncountbyblocknum`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}gettransactioncountbyblocknum`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'num',
        description: `Block height`,
        placeholder: `i.e. 100`,
      },
    ],
  },
  gettransactioninfobyblocknum: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}gettransactioninfobyblocknum`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}gettransactioninfobyblocknum`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'num',
        description: `Block height`,
        placeholder: `i.e. 100`,
      },
    ],
  },
  getaccount: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getaccount`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getaccount`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'address',
        description: `Default hexString`,
        placeholder: `i.e. 41E552F6487585C2B58BC2C9BB4492BC1F17132CD0`,
      },
    ],
  },
  getassetissuelist: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}getassetissuelist`,
        `${url}${TronNodeUrl.SolidityNode}getassetissuelist`,
      );
    },
  },
  getpaginatedassetissuelist: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getpaginatedassetissuelist`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getpaginatedassetissuelist`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'offset',
        description: `The index of the start token`,
        placeholder: `i.e. 0`,
      },
      {
        type: 'number',
        fieldName: 'limit',
        description: `The amount of tokens per page`,
        placeholder: `i.e. 10`,
      },
    ],
  },
  getpaginatedproposallist: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getpaginatedproposallist`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getpaginatedproposallist`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'offset',
        description: `The index of the start proposal`,
        placeholder: `i.e. 0`,
      },
      {
        type: 'number',
        fieldName: 'limit',
        description: `The amount of proposals per page`,
        placeholder: `i.e. 10`,
      },
    ],
  },
  getpaginatedexchangelist: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getpaginatedexchangelist`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getpaginatedexchangelist`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'offset',
        description: `The index of the start exchange pair`,
        placeholder: `i.e. 0`,
      },
      {
        type: 'number',
        fieldName: 'limit',
        description: `The amount of exchange pairs per page`,
        placeholder: `i.e. 10`,
      },
    ],
  },
  getcontract: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getcontract`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getcontract`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'value',
        description: `Contract address, default hexString`,
        placeholder: 'i.e. 4189139CB1387AF85E3D24E212A008AC974967E561',
      },
    ],
  },
  getproposalbyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getproposalbyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getproposalbyid`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'id',
        description: `Proposal id`,
        placeholder: 'i.e. 1',
      },
    ],
  },
  listproposals: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}listproposals`,
        `${url}${TronNodeUrl.SolidityNode}listproposals`,
      );
    },
  },
  getaccountresource: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getaccountresource`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getaccountresource`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'address',
        description: `Address, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
    ],
  },
  getexchangebyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getexchangebyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getexchangebyid`,
      );
    },
    args: [
      {
        type: 'number',
        fieldName: 'id',
        description: `Exchange pair id`,
        placeholder: 'i.e. 1',
      },
    ],
  },
  listexchanges: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}listexchanges`,
        `${url}${TronNodeUrl.SolidityNode}listexchanges`,
      );
    },
  },
  getchainparameters: {
    method: Method.Get,
    codeSample: url => {
      return GetTemplate(
        `${url}${TronNodeUrl.FullNode}getchainparameters`,
        `${url}${TronNodeUrl.SolidityNode}getchainparameters`,
      );
    },
  },
  getdelegatedresource: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getdelegatedresource`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getdelegatedresource`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'fromAddress',
        description: `Energy from address, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
      {
        type: 'textarea',
        fieldName: 'toAddress',
        description: `Energy to address, default hexString`,
        placeholder: 'i.e. 41c6600433381c731f22fc2b9f864b14fe518b322f',
      },
    ],
  },
  getdelegatedresourceaccountindex: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getdelegatedresourceaccountindex`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getdelegatedresourceaccountindex`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'value',
        description: `Address, default hexString`,
        placeholder: 'i.e. 419844f7600e018fd0d710e2145351d607b3316ce9',
      },
    ],
  },
  getaccountbyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getaccountbyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getaccountbyid`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'account_id',
        description: `Account id, default hexString`,
        placeholder: 'i.e. 6161616162626262',
      },
    ],
  },
  getdeferredtransactionbyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getdeferredtransactionbyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getdeferredtransactionbyid`,
      );
    },
    args: [
      {
        type: 'textfield',
        fieldName: 'value',
        description: `transaction id`,
        placeholder:
          'i.e. 309b6fa3d01353e46f57dd8a8f27611f98e392b50d035cef213f2c55225a8bd2',
      },
    ],
  },
  getdeferredtransactioninfobyid: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getdeferredtransactioninfobyid`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getdeferredtransactioninfobyid`,
      );
    },
    args: [
      {
        type: 'textfield',
        fieldName: 'value',
        description: `transaction id`,
        placeholder:
          'i.e. 309b6fa3d01353e46f57dd8a8f27611f98e392b50d035cef213f2c55225a8bd2',
      },
    ],
  },
  triggerconstantcontract: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}triggerconstantcontract`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}triggerconstantcontract`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'contract_address',
        description: `Smart contract address, defualt hexString`,
        placeholder: 'i.e. 4189139CB1387AF85E3D24E212A008AC974967E561',
      },
      {
        type: 'textfield',
        fieldName: 'function_selector',
        description: `Function call, must not leave a blank space`,
        placeholder: 'i.e. set(uint256,uint256)',
      },
      {
        type: 'textarea',
        fieldName: 'parameter',
        description: `The parameter passed to 'function_selector', the format must match with the VM's requirement. You can use a hs tool provided by remix to convert a parameter like [1,2] to the format that VM requires`,
        placeholder:
          'i.e. 00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
      },
      {
        type: 'number',
        fieldName: 'fee_limit',
        description: `The maximum TRX burns for resource consumption`,
        placeholder: 'i.e. 10',
      },
      {
        type: 'number',
        fieldName: 'call_value',
        description: `The TRX transfer to the contract for each call`,
        placeholder: 'i.e. 100',
      },
      {
        type: 'textarea',
        fieldName: 'owner_address',
        description:
          'Owner address that triggers the contract, default hexString',
        placeholder: 'i.e. 41D1E7A6BC354106CB410E65FF8B181C600FF14292',
      },
    ],
  },
  getmerkletreevoucherinfo: {
    method: Method.Post,
    codeSample: (url, args) => {
      return PostTemplate(
        `${url}${TronNodeUrl.FullNode}getmerkletreevoucherinfo`,
        safeStringifyJSON(args),
        `${url}${TronNodeUrl.SolidityNode}getmerkletreevoucherinfo`,
      );
    },
    args: [
      {
        type: 'textarea',
        fieldName: 'out_points',
        description: `Note information`,
        placeholder: `i.e. [{
          "hash":"185b3e085723f5862b3a3c3cf54d52f5c1eaf2541e3a1e0ecd08bc12cd958d74",
          "index":0
        }]`,
      },
    ],
  },
  easytransferbyprivate: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  easytransferassetbyprivate: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  easytransfer: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  easytransferasset: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  gettransactionsign: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  createaddress: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  listnodes: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  generateaddress: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getnodeinfo: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  addtransactionsign: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getakfromask: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getnkfromnsk: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getspendingkey: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getexpandedspendingkey: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getdiversifier: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getincomingviewingkey: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  createspendauthsig: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  getnewshieldedaddress: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  createshieldedtransaction: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  createshieldedcontractparameters: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  createshieldedcontractparameterswithoutask: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  scanshieldedtrc20notesbyivk: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  scanshieldedtrc20notesbyovk: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  isshieldedtrc20contractnotespent: {
    method: Method.Post,
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
};
