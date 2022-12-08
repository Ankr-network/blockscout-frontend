import { TronChainMethod } from 'domains/requestComposer/constants/tron';
import { safeParseJSON } from 'modules/common/utils/safeParseJSON';

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
