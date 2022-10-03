import { TronChainMethod } from 'domains/requestComposer/constants/tron';

export const safeParseJSON = (s: any) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    try {
      return JSON.parse(s.replace(/\n/gi, '').replace(/'/g, '"'));
    } catch (_e) {
      return s;
    }
  }
};

export const safeStringifyJSON = (s: any) => {
  try {
    return JSON.stringify(s);
  } catch (_e) {
    return s;
  }
};

export const renderProposalcreateParameter = (parameters: any) => ({
  owner_address: parameters.owner_address,
  parameters: safeParseJSON(parameters.parameters),
});

export const renderGetaccountbalanceParameters = (parameters: any) => ({
  account_identifier: safeParseJSON(parameters.account_identifier),
  block_identifier: safeParseJSON(parameters.block_identifier),
  visible: true,
});

export const renderBroadcasttransactionParameters = (parameters: any) =>
  safeParseJSON(parameters.transaction);

export const addVisibleParameter = (parameters: any) => {
  parameters.visible = true;
};

export const formatParameters = (
  methodName: TronChainMethod,
  parameters: any,
) => {
  if (methodName && methodName === TronChainMethod.proposalcreate) {
    return renderProposalcreateParameter(parameters);
  }

  if (methodName && methodName === TronChainMethod.getaccountbalance) {
    return renderGetaccountbalanceParameters(parameters);
  }

  if (methodName && methodName === TronChainMethod.broadcasttransaction) {
    return renderBroadcasttransactionParameters(parameters);
  }

  return parameters;
};
